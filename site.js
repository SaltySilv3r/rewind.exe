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

let zIndexCounter = 100;
function bringWindowToFront(windowElement) {
  windowElement.style.zIndex = zIndexCounter++;

  const allTaskbarButtons = document.querySelectorAll('.taskbar-button');
  allTaskbarButtons.forEach(btn => btn.classList.remove('active'));
  
  if (windowElement.id === "txtwindow") {
    document.getElementById("txt-taskbar-btn")?.classList.add('active');
  } else if (windowElement.id === "browserwindow") {
    document.getElementById("browser-taskbar-btn")?.classList.add('active');
  }
}

const textIconButton = document.querySelector("#txt-icon");
const txtCloseButton = document.querySelector("#close-btn");
const txtMinimizeButton = document.querySelector("#txt-minimize-btn");

textIconButton.addEventListener("click", (event) => {
  const txtWindow = document.querySelector("#txtwindow");
  txtWindow.classList.add("--show");
  dragElement(txtWindow);
  bringWindowToFront(txtWindow);
  addTxtToTaskbar();
});

txtCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector("#txtwindow").classList.remove("--show");
  removeTxtFromTaskbar();
});

txtMinimizeButton.addEventListener("click", (event) => {
  event.stopPropagation();
  document.querySelector("#txtwindow").classList.remove("--show");
});

function addTxtToTaskbar() {
  if (!document.getElementById("txt-taskbar-btn")) {
    const taskbar = document.getElementById("taskbar");
    const txtBtn = document.createElement("div");
    txtBtn.id = "txt-taskbar-btn";
    txtBtn.className = "taskbar-button active";
    txtBtn.innerHTML = '<img src="images/notepad.webp" alt="Notepad"><span>readme.txt</span>';
    
    txtBtn.addEventListener("click", function() {
      const txtWindow = document.getElementById("txtwindow");
      if (!txtWindow.classList.contains("--show")) {
        txtWindow.classList.add("--show");
        bringWindowToFront(txtWindow);
      } else if (txtWindow.style.zIndex < zIndexCounter - 1) {
        bringWindowToFront(txtWindow);
      } else {
        txtWindow.classList.remove("--show");
      }
    });
    
    taskbar.insertBefore(txtBtn, document.getElementById("time"));
  }
}

function removeTxtFromTaskbar() {
  const txtBtn = document.getElementById("txt-taskbar-btn");
  if (txtBtn) {
    txtBtn.remove();
  }
}

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
          <h2>First Challenge</h2>
          <p>The hidden URL is: <span class="secret-url">https://www.next-challenge.com/5678</span></p>
        </div>
      </div>
      
      <!-- Second website: next-challenge.com -->
      <div class="website-content next-challenge-content">
        <div class="next-challenge-page">
          <h2>Second Challenge</h2>
          <p>The hidden URL is: <span class="secret-url">https://www.nextest-challenge.com/91011</span></p>
        </div>
      </div>

      <!-- Third website: nextest-challenge.com -->
      <div class="website-content nextest-challenge-content">
        <div class="nextest-challenge-page">
          <h2>Final Challenge</h2>
          <p>Secret code: <span class="secret-code">WINDOWS_XP_FOREVER</span></p>
          <p>The hidden URL is: <span class="secret-url">https://www.final-challenge.com/1213</span></p>
        </div>
      </div>
      
      <!-- Fourth website: final-challenge.com -->
      <div class="website-content final-challenge-content">
        <div class="final-challenge-page">
          <h2>Password please</h2>
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
  bringWindowToFront(browserWindow);
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
        bringWindowToFront(browserWindow);
      } else if (browserWindow.style.zIndex < zIndexCounter - 1) {
        bringWindowToFront(browserWindow);
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
  
  if (url === "https://www.temporary-url.com/f452") {
    document.querySelector(".temp-url-content").classList.add("active");
  } else if (url === "https://www.next-challenge.com/5678") {
    document.querySelector(".next-challenge-content").classList.add("active");
  } else if (url === "https://www.nextest-challenge.com/91011") {
    document.querySelector(".nextest-challenge-content").classList.add("active");
  } else if (url === "https://www.final-challenge.com/1213") {
    document.querySelector(".final-challenge-content").classList.add("active");
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

document.getElementById("txtwindow").addEventListener("mousedown", function() {
  bringWindowToFront(this);
});

browserWindow.addEventListener("mousedown", function() {
  bringWindowToFront(this);
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
    
    bringWindowToFront(elmnt);
    
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
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