(function() {
    'use strict';

    function updateClock() {
        var clockElement = document.getElementById('clock');
        if (clockElement) {
            var now = new Date();
            var formattedTime = now.getFullYear() + '-' +
                ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
                ('0' + now.getDate()).slice(-2) + ' ' +
                ('0' + now.getHours()).slice(-2) + ':' +
                ('0' + now.getMinutes()).slice(-2) + ':' +
                ('0' + now.getSeconds()).slice(-2);
            clockElement.textContent = formattedTime;
        }
    }

    function startClock() {
        var clockContainer = document.getElementById('clock-container');
        if (!clockContainer) return;

        var periodSeconds = parseInt(clockContainer.getAttribute('data-period-sec'), 10);
        var updateInterval = 13;

        if (isFinite(periodSeconds) && periodSeconds > 0) {
            updateInterval = periodSeconds;
        }

        updateClock();
        setInterval(updateClock, updateInterval * 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startClock);
    } else {
        startClock();
    }

})();