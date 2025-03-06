function updateClock() {
    const now = new Date();
    const timeDisplay = document.getElementById('time');
    timeDisplay.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',
        hour12: false
    });
}
setInterval(updateClock, 1000);
updateClock();

object.onclick = function(){readme};
