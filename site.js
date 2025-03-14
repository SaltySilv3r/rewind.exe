function updateClock() {
  const now = new Date();
  const timeDisplay = document.getElementById('time');
  timeDisplay.textContent = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
setInterval(updateClock, 1000);
updateClock();

// Window management
let zIndexCounter = 100;
function bringWindowToFront(windowElement) {
  windowElement.style.zIndex = zIndexCounter++;

  const allTaskbarButtons = document.querySelectorAll('.taskbar-button');
  allTaskbarButtons.forEach(btn => btn.classList.remove('active'));

  const windowId = windowElement.id;
  if (windowId === "txtwindow") {
    document.getElementById("txt-taskbar-btn")?.classList.add('active');
  } else if (windowId === "browserwindow") {
    document.getElementById("browser-taskbar-btn")?.classList.add('active');
  }
}

// Drag functionality
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = document.getElementById(elmnt.id + "header");

  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (elmnt.id === "browserwindow" && elmnt.classList.contains("maximized")) {
      return;
    }

    bringWindowToFront(elmnt);

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

// Text window functionality
const textIconButton = document.querySelector("#txt-icon");
const txtCloseButton = document.querySelector("#close-btn");
const txtMinimizeButton = document.querySelector("#txt-minimize-btn");
const txtWindow = document.querySelector("#txtwindow");

textIconButton.addEventListener("click", () => {
  txtWindow.classList.add("--show");
  dragElement(txtWindow);
  bringWindowToFront(txtWindow);
  addTxtToTaskbar();
});

txtCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  txtWindow.classList.remove("--show");
  removeTxtFromTaskbar();
});

txtMinimizeButton.addEventListener("click", (event) => {
  event.stopPropagation();
  txtWindow.classList.remove("--show");
});

function addTxtToTaskbar() {
  if (!document.getElementById("txt-taskbar-btn")) {
    const taskbar = document.getElementById("taskbar");
    const txtBtn = document.createElement("div");
    txtBtn.id = "txt-taskbar-btn";
    txtBtn.className = "taskbar-button active";
    txtBtn.innerHTML = '<img src="images/notepad.webp" alt="Notepad"><span>readme.txt</span>';

    txtBtn.addEventListener("click", function () {
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

// Browser window functionality
const browserIcon = document.getElementById("browser");
const browserWindow = document.getElementById("browserwindow");

// Browser addEventListener
browserIcon.addEventListener("click", function () {
  browserWindow.style.display = "block";
  dragElement(browserWindow);
  addBrowserToTaskbar();
  bringWindowToFront(browserWindow);
});

document.getElementById("browser-close-btn").addEventListener("click", function () {
  browserWindow.style.display = "none";
  removeBrowserFromTaskbar();
});

document.getElementById("minimize-btn").addEventListener("click", function () {
  browserWindow.style.display = "none";
});

document.getElementById("maximize-btn").addEventListener("click", function () {
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

    browserBtn.addEventListener("click", function () {
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

// Navigation 
const addressBar = document.querySelector(".address-bar");
const goButton = document.querySelector(".go-button");

function navigateToUrl() {
  const url = addressBar.value.trim().toLowerCase();

  document.querySelectorAll(".website-content").forEach(content => {
    content.classList.remove("active");
  });

  if (url === "https://www.battlefieldcenterz.com") {
    document.querySelector(".battlefieldcenterz").classList.add("active");
  } else if (url === "https://www.chaostheoryforums.com") {
    document.querySelector(".chaostheoryforums").classList.add("active");
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
addressBar.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    navigateToUrl();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('bf-read-more')) {
      e.preventDefault();
      document.querySelector('.battlefieldcenterz .bf-container').style.display = 'none';
      const articlePage = document.querySelector('.battlefield-article');
      if (articlePage) {
        articlePage.classList.add('active');
      }
    }

    if (e.target && e.target.classList.contains('bf-back-button')) {
      e.preventDefault();
      document.querySelector('.battlefield-article').classList.remove('active');
      document.querySelector('.battlefieldcenterz .bf-container').style.display = 'block';
    }
  });
});
txtWindow.addEventListener("mousedown", function () {
  bringWindowToFront(this);
});

browserWindow.addEventListener("mousedown", function () {
  bringWindowToFront(this);
});