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
  <div id="browserwindowheader">
    Internet Explorer 
    <div class="window-controls">
      <img id="minimize-btn" src="images/minimize.png" alt="Minimize">
      <img id="maximize-btn" src="images/maximize.jpg" alt="Maximize">
      <img id="browser-close-btn" src="images/exit.png" alt="close">
    </div>
  </div>
  <div class="browser-content">
    <div class="browser-toolbar">
      <button class="browser-button">Back</button>
      <button class="browser-button">Forward</button>
      <button class="browser-button">Refresh</button>
      <button class="browser-button">Home</button>
      <input type="text" class="address-bar" value="https://www.temporary-url.com/F452">
      <button class="browser-button go-button">Go</button>
    </div>
    <div class="browser-page">
      <!-- Default page shown initially -->
      <div class="website-content default-content active">
        <div class="browser-loading">
          <h2>Welcome to Internet Explorer</h2>
          <p>Enter a URL in the address bar and click Go</p>
        </div>
      </div>
      
      <!-- First website: temporary-url.com -->
      <div class="website-content temp-url-content">
        <div class="browser-loading">
          <h2>Loading page...</h2>
          <p>The hidden URL is: <span class="secret-url">https://www.next-challenge.com/X721</span></p>
        </div>
      </div>
      
      <!-- Second website: next-challenge.com -->
      <div class="website-content next-challenge-content">
        <div class="next-challenge-page">
          <h2>Congratulations!</h2>
          <p>You've found the secret page.</p>
          <p>Your next clue is: <span class="secret-code">XP-REWIND-7734</span></p>
        </div>
      </div>
      
      <!-- 404 page for unknown URLs -->
      <div class="website-content not-found-content">
        <div class="browser-error">
          <h2>404 - Page Not Found</h2>
          <p>The requested URL was not found on this server.</p>
        </div>
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
  addBrowserToTaskbar();
});

document.getElementById("browser-close-btn").addEventListener("click", function() {
  browserWindow.style.display = "none";
  removeBrowserFromTaskbar();
});

document.getElementById("minimize-btn").addEventListener("click", function() {
  browserWindow.style.display = "none";
});

document.getElementById("maximize-btn").addEventListener("click", function() {
  if (!browserWindow.classList.contains("maximized")) {
    browserWindow.style.width = "calc(100%)";
    browserWindow.style.height = "calc(100% - 40px)";
    browserWindow.style.top = "0";
    browserWindow.style.left = "0";
    browserWindow.classList.add("maximized");
  } else {
    browserWindow.style.width = "800px";
    browserWindow.style.height = "600px";
    browserWindow.style.top = "100px";
    browserWindow.style.left = "100px";
    browserWindow.classList.remove("maximized");
  }
});
function addBrowserToTaskbar() {
  if (!document.getElementById("browser-taskbar-btn")) {
    const taskbar = document.getElementById("taskbar");
    const browserBtn = document.createElement("div");
    browserBtn.id = "browser-taskbar-btn";
    browserBtn.className = "taskbar-button active";
    browserBtn.innerHTML = '<img src="images/explorer.webp" alt="IE"><span>Internet Explorer</span>';
    
    browserBtn.addEventListener("click", function() {
      if (browserWindow.style.display === "none") {
        browserWindow.style.display = "block";
      } else {
        browserWindow.style.display = "none";
      }
    });
    
    taskbar.insertBefore(browserBtn, document.getElementById("time"));
  }
}

function removeBrowserFromTaskbar() {
  const browserBtn = document.getElementById("browser-taskbar-btn");
  if (browserBtn) {
    browserBtn.remove();
  }
}

const addressBar = document.querySelector(".address-bar");
const goButton = document.querySelector(".go-button");
function navigateToUrl() {
  const url = addressBar.value.trim().toLowerCase();
  
  document.querySelectorAll(".website-content").forEach(content => {
    content.classList.remove("active");
  });
  
  if (url === "https://www.temporary-url.com/1234") {
    document.querySelector(".temp-url-content").classList.add("active");
  } else if (url === "https://www.next-challenge.com/5678") {
    document.querySelector(".next-challenge-content").classList.add("active");
  } else if (url === "https://www.nextest-challenge.com/5678") {
    document.querySelector(".nextest-challenge-content").classList.add("active");
  } else {
    document.querySelector(".not-found-content").classList.add("active");
  }
}

goButton.addEventListener("click", navigateToUrl);
addressBar.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    navigateToUrl();
  }
});

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (elmnt.id === "browserwindow" && elmnt.classList.contains("maximized")) {
      return;
    }
    
    e = e || window.addEventListener;
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