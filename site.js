function updateClock() {
  const now = new Date();
  const timeDisplay = document.getElementById('time');
  timeDisplay.textContent = now.toLocaleTimeString([], {
      hour: '2-digit', 
      minute:'2-digit',
      hour12: false
  });
}
setInterval(updateClock, 1000);
updateClock();

const textIconButton = document.querySelector("#txt-icon");
const closeButton = document.querySelector("#close-btn");

textIconButton.addEventListener("click", (event) => {
document.querySelector("#txtwindow").classList.add("--show");
dragElement(document.getElementById("txtwindow"));
});

closeButton.addEventListener("click", (event) => {
event.stopPropagation();
document.querySelector("#txtwindow").classList.remove("--show");
});

const browserIcon = document.getElementById("browser");
const desktop = document.getElementById("desktop");

let browserWindow = document.createElement("div");
browserWindow.id = "browserwindow";
browserWindow.innerHTML = `
  <div id="browserwindowheader">Internet Explorer <img id="browser-close-btn" src="images/exit.png" alt="close"></div>
  <div class="browser-content">
      <div class="browser-toolbar">
          <button class="browser-button">Back</button>
          <button class="browser-button">Forward</button>
          <button class="browser-button">Refresh</button>
          <button class="browser-button">Home</button>
          <input type="text" class="address-bar" value="https://www.temporary-url.com/F452">
          <button class="browser-button">Go</button>
      </div>
      <div class="browser-page">
          <div class="browser-loading">
              <h2>Loading page...</h2>
              <p>The hidden URL is: <span class="secret-url">https://www.next-challenge.com/X721</span></p>
          </div>
      </div>
  </div>
`;
desktop.appendChild(browserWindow);

browserWindow.style.display = "none";
browserWindow.style.position = "absolute";
browserWindow.style.top = "100px";
browserWindow.style.left = "100px";

browserIcon.addEventListener("click", function() {
  browserWindow.style.display = "block";
  dragElement(browserWindow);
});

document.getElementById("browser-close-btn").addEventListener("click", function() {
  browserWindow.style.display = "none";
});

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
      elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
      e = e || window.addEventListener;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
  }
}