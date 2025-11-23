class GraphRenderer {
    static CENTER_X = 210;
    static CENTER_Y = 210;
    static R_PIXELS = 170;

    constructor(svgId) {
        this.svgId = svgId;
        this.svg = null;
        this.RMax = this.getRMaxFromDOM();
    }

    init() {
        const newSvg = document.getElementById(this.svgId);

        if (this.svg && this.svg !== newSvg && this.onGraphClickBound) {
            this.svg.removeEventListener('click', this.onGraphClickBound);
        }

        this.svg = newSvg;

        if (this.svg && !this.svg.dataset.clickBound) {
            this.onGraphClickBound = this.onGraphClick.bind(this);
            this.svg.addEventListener('click', this.onGraphClickBound);
            this.svg.dataset.clickBound = true;
        }
    }

    getCurrentR() {
        const el = document.getElementById('appForm:rValue');
        const v = parseFloat(el?.value);
        return (isFinite(v) && v > 0) ? v : NaN;
    }

    getRMaxFromDOM() {
        let max = 0;
        document.querySelectorAll('#appForm\\:r input[type="radio"]').forEach(function (el) {
            const v = Math.abs(parseFloat(el.value));
            if (isFinite(v) && v > max) max = v;
        });
        return max > 0 ? max : 5;
    }

    get unitScale() {
        return GraphRenderer.R_PIXELS / this.RMax;
    }

    toX(x) {
        return GraphRenderer.CENTER_X + this.unitScale * x;
    }

    toY(y) {
        return GraphRenderer.CENTER_Y - this.unitScale * y;
    }

    drawTicks() {
        const g = this.svg.querySelector('#ticks');
        if (!g) return;
        const R = this.getCurrentR();

        if (!isFinite(R) || R <= 0) {
            g.innerHTML = '';
            return;
        }

        const Rm = this.RMax;
        let out = '';

        const tickX = (x, label) => {
            const px = this.toX(x);
            out += `<g><line x1="${px}" y1="${GraphRenderer.CENTER_Y - 4}" x2="${px}" y2="${GraphRenderer.CENTER_Y + 4}" stroke="white"/>` +
                `<text x="${px}" y="${GraphRenderer.CENTER_Y - 8}" font-size="12" text-anchor="middle" fill="white">${label}</text></g>`;
        };
        const tickY = (y, label) => {
            const py = this.toY(y);
            out += `<g><line x1="${GraphRenderer.CENTER_X - 4}" y1="${py}" x2="${GraphRenderer.CENTER_X + 4}" y2="${py}" stroke="white"/>` +
                `<text x="${GraphRenderer.CENTER_X + 6}" y="${py + 4}" font-size="12" fill="white">${label}</text></g>`;
        };

        tickX(-R, '-R'); tickX(-R/2, '-R/2'); tickX(R/2, 'R/2'); tickX(R, 'R');
        tickY(R, 'R'); tickY(R/2, 'R/2'); tickY(-R/2, '-R/2'); tickY(-R, '-R');

        g.innerHTML = out;
    }

    drawArea() {
        const g = this.svg.querySelector('#area');
        if (!g) return;
        const R = this.getCurrentR();
        if (!isFinite(R) || R <= 0) {
            g.innerHTML = '';
            return;
        }

        let dPaths = '';
        const P1 = [this.toX(-R), this.toY(0)];
        const P2 = [this.toX(0), this.toY(0)];
        const P3 = [this.toX(0), this.toY(-R)];
        const P4 = [this.toX(-R), this.toY(-R)];
        dPaths += `M ${P1[0]} ${P1[1]} L ${P2[0]} ${P2[1]} L ${P3[0]} ${P3[1]} L ${P4[0]} ${P4[1]} Z`;

        const T1 = [this.toX(-R), this.toY(0)];
        const T2 = [this.toX(0), this.toY(R/2)];
        const T3 = [this.toX(0), this.toY(0)];
        dPaths += ` M ${T1[0]} ${T1[1]} L ${T2[0]} ${T2[1]} L ${T3[0]} ${T3[1]} Z`;

        const rad = R / 2;
        const radPx = this.unitScale * rad;
        const arcStart = [this.toX(rad), this.toY(0)];
        const arcEnd   = [this.toX(0), this.toY(-rad)];

        const arcPath = `M ${GraphRenderer.CENTER_X} ${GraphRenderer.CENTER_Y} ` +
            `L ${arcStart[0]} ${arcStart[1]} ` +
            `A ${radPx} ${radPx} 0 0 1 ${arcEnd[0]} ${arcEnd[1]} ` +
            `Z`;
        dPaths += ` ${arcPath}`;

        g.innerHTML = `<path d="${dPaths}" fill="#8cc3ff" fill-opacity="0.45" stroke="white"></path>`;
    }

    positionPoints() {
        if (!this.svg) return;

        const r_curr = this.getCurrentR();
        const hidePoints = !(isFinite(r_curr) && r_curr > 0);

        this.svg.querySelectorAll('#pointsLayer circle').forEach(el => {
            if (hidePoints) {
                el.setAttribute('visibility', 'hidden');
                return;
            }

            el.setAttribute('visibility', 'visible');

            const x_coord = parseFloat(el.getAttribute('data-x'));
            const y_coord = parseFloat(el.getAttribute('data-y'));
            const r_sub = parseFloat(el.getAttribute('data-r'));

            if (isFinite(x_coord) && isFinite(y_coord) && isFinite(r_sub) && r_sub !== 0) {

                const x_abs_new = x_coord * (r_curr / r_sub);
                const y_abs_new = y_coord * (r_curr / r_sub);

                el.setAttribute('cx', this.toX(x_abs_new));
                el.setAttribute('cy', this.toY(y_abs_new));
            }
            else if (isFinite(x_coord) && isFinite(y_coord)) {
                el.setAttribute('cx', this.toX(x_coord));
                el.setAttribute('cy', this.toY(y_coord));
            }
        });
    }

    sendPoint(x, y) {
        if (typeof rcSendPoint === 'function') {
            rcSendPoint([{name:'x', value:x.toFixed(6)}, {name:'y', value:y.toFixed(6)}]);
        }
    }

    onGraphClick(evt) {
        const R = this.getCurrentR();
        if (!this.svg || R <= 0) return;

        const rect = this.svg.getBoundingClientRect();
        const px = evt.clientX - rect.left;
        const py = evt.clientY - rect.top;

        const S = this.unitScale;

        const x = (px - GraphRenderer.CENTER_X) / S;
        const y = (GraphRenderer.CENTER_Y - py) / S;

        this.sendPoint(x, y);
    }

    redrawAll() {
        this.init();
        if (!this.svg) return;

        this.drawTicks();
        this.drawArea();
        this.positionPoints();
    }
}

let graphRendererInstance;

document.addEventListener('DOMContentLoaded', () => {
    graphRendererInstance = new GraphRenderer('graphSvg');
    graphRendererInstance.redrawAll();
});

window.redrawAll = function() {
    graphRendererInstance.redrawAll();
};