(function () {

    var CENTER_X = 210, CENTER_Y = 210, R_PIXELS = 170;

    function getR() {
        var el = document.getElementById('appForm:rValue');
        var v = parseFloat(el.value);
        if (isFinite(v) && v > 0) return v;
        return NaN;
    }

    function getRMax() {
        var max = 0;
        document.querySelectorAll('#appForm\\:r input[type="radio"]').forEach(function (el) {
            var v = Math.abs(parseFloat(el.value));
            if (isFinite(v) && v > max) max = v;
        });
        return max > 0 ? max : 3;
    }

    function unitScale() { return R_PIXELS / getRMax(); }
    function toX(x) { return CENTER_X + unitScale() * x; }
    function toY(y) { return CENTER_Y - unitScale() * y; }

    function drawTicks() {
        var g = document.getElementById('ticks');
        if (!g) return;
        var Rm = getRMax(), out = '';

        function tickX(x, label) {
            var px = toX(x);
            out += '<g><line x1="'+px+'" y1="'+(CENTER_Y-4)+'" x2="'+px+'" y2="'+(CENTER_Y+4)+'" stroke="black"/>' +
                '<text x="'+px+'" y="'+(CENTER_Y-8)+'" font-size="12" text-anchor="middle">'+label+'</text></g>';
        }
        function tickY(y, label) {
            var py = toY(y);
            out += '<g><line x1="'+(CENTER_X-4)+'" y1="'+py+'" x2="'+(CENTER_X+4)+'" y2="'+py+'" stroke="black"/>' +
                '<text x="'+(CENTER_X+6)+'" y="'+(py+4)+'" font-size="12">'+label+'</text></g>';
        }

        tickX(-Rm, '-R'); tickX(-Rm/2, '-R/2'); tickX(Rm/2, 'R/2'); tickX(Rm, 'R');
        tickY(Rm, 'R'); tickY(Rm/2, 'R/2'); tickY(-Rm/2, '-R/2'); tickY(-Rm, '-R');
        g.innerHTML = out;
    }

    function drawArea() {
        var g = document.getElementById('area');
        if (!g) return;
        var R = getR();
        if (!isFinite(R) || R <= 0) { g.innerHTML = ''; return; }

        var t1 = [toX(0), toY(0)];
        var t2 = [toX(R/2), toY(0)];
        var t3 = [toX(0), toY(R)];
        var tri = 'M '+t1[0]+' '+t1[1]+' L '+t2[0]+' '+t2[1]+' L '+t3[0]+' '+t3[1]+' Z';

        var rad = R/2;
        var start = [toX(0), toY(rad)];
        var end   = [toX(-rad), toY(0)];
        var radPx = unitScale() * rad;
        var arc = 'M '+CENTER_X+' '+CENTER_Y + ' L '+start[0]+' '+start[1] + ' A '+radPx+' '+radPx+' 0 0 0 '+end[0]+' '+end[1] + ' Z';

        var A = [toX(0), toY(0)];
        var B = [toX(R), toY(0)];
        var C = [toX(R), toY(-R/2)];
        var D = [toX(0), toY(-R/2)];
        var rect = 'M '+A[0]+' '+A[1]+' L '+B[0]+' '+B[1]+' L '+C[0]+' '+C[1]+' L '+D[0]+' '+D[1]+' Z';

        g.innerHTML = '<path d="'+tri+'"></path>' + '<path d="'+arc+'"></path>' + '<path d="'+rect+'"></path>';
    }

    function positionPoints() {
        document.querySelectorAll('#pointsLayer circle').forEach(function (el) {
            var x = parseFloat(el.getAttribute('data-x'));
            var y = parseFloat(el.getAttribute('data-y'));
            if (isFinite(x) && isFinite(y)) {
                el.setAttribute('cx', toX(x));
                el.setAttribute('cy', toY(y));
            }
        });
    }

    function sendPoint(x, y) {
        rcSendPoint([{name:'x', value:x.toFixed(6)}, {name:'y', value:y.toFixed(6)}]);
    }

    function onGraphClick(evt) {
        var svg = document.getElementById('graphSvg');
        var rect = svg.getBoundingClientRect();
        var px = evt.clientX - rect.left;
        var py = evt.clientY - rect.top;
        var S = unitScale();
        var x = (px - CENTER_X) / S;
        var y = (CENTER_Y - py) / S;
        sendPoint(x, y);
    }

    function bindSvgClick() {
        var svg = document.getElementById('graphSvg');
        if (svg && !svg.__clickBound) {
            svg.addEventListener('click', onGraphClick);
            svg.__clickBound = true;
        }
    }

    function redrawAll() {
        drawTicks();
        drawArea();
        positionPoints();
        bindSvgClick();
    }

    window.redrawAll = redrawAll;
    document.addEventListener('DOMContentLoaded', redrawAll);

})();