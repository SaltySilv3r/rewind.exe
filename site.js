// Clock functionality
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

// Browser history functionality
let browserHistory = [];
let currentHistoryPosition = -1;

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

// Browser event listeners
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

// Browser content loading functions
function showLoadingScreen() {
  // Hide all website content
  document.querySelectorAll(".website-content").forEach(content => {
    content.classList.remove("active");
  });

  // Show loading screen
  document.querySelector(".browser-loading-screen").classList.add("active");
}

function hideLoadingScreen() {
  document.querySelector(".browser-loading-screen").classList.remove("active");
}

// Browser navigation functionality
const addressBar = document.querySelector(".address-bar");
const goButton = document.querySelector(".go-button");
const backButton = document.getElementById("back-button");
const refreshButton = document.getElementById("refresh-button");

function navigateToUrl(url, addToHistory = true) {
  showLoadingScreen();

  // Add current URL to history if needed
  if (addToHistory && url) {
    // If we navigated backward/forward and then to a new URL, truncate the forward history
    if (currentHistoryPosition < browserHistory.length - 1) {
      browserHistory = browserHistory.slice(0, currentHistoryPosition + 1);
    }

    browserHistory.push(url);
    currentHistoryPosition = browserHistory.length - 1;
  }

  // Simulate loading delay
  setTimeout(() => {
    hideLoadingScreen();

    document.querySelectorAll(".website-content").forEach(content => {
      content.classList.remove("active");
    });

    if (!url || url === "") {
      document.querySelector(".default-content").classList.add("active");
    } else if (url === "https://www.battlefieldcenterz.com") {
      document.querySelector(".battlefieldcenterz").classList.add("active");
    } else if (url === "https://www.chaostheoryforums.com") {
      document.querySelector(".ChaosTheoryForum").classList.add("active");
      document.querySelector("#chaos-main-page").style.display = "block";
      document.querySelector("#chaos-conspiracy-page").style.display = "none";
      setupChaosForumNavigation();
    } else if (url.toLowerCase() === "https://www.huntthewitch.com") {
      document.querySelector(".nextest-challenge-content").classList.add("active");
    } else if (url === "https://www.nextest-challenge.com/91011") {
      document.querySelector(".nextest-challenge-content").classList.add("active");
    } else if (url === "https://www.final-challenge.com/1213") {
      document.querySelector(".final-challenge-content").classList.add("active");
    } else if (url === "under-construction") {
      document.querySelector(".under-construction").classList.add("active");
    } else {
      document.querySelector(".not-found-content").classList.add("active");
    }

    // Update address bar with current URL
    if (url) {
      addressBar.value = url;
    }
  }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds
}

// Navigation event listeners
goButton.addEventListener("click", function() {
  const url = addressBar.value.trim().toLowerCase();
  navigateToUrl(url);
});

addressBar.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const url = addressBar.value.trim().toLowerCase();
    navigateToUrl(url);
  }
});

backButton.addEventListener("click", function() {
  if (currentHistoryPosition > 0) {
    const currentUrl = browserHistory[currentHistoryPosition];
    currentHistoryPosition--;
    const previousUrl = browserHistory[currentHistoryPosition];
    
    // Handle special case for Chaos Theory conspiracy page
    if (currentUrl === "https://www.chaostheoryforums.com/conspiracy") {
      document.querySelector('#chaos-conspiracy-page').style.display = 'none';
      document.querySelector('#chaos-main-page').style.display = 'block';
      addressBar.value = "https://www.chaostheoryforums.com";
    } else {
      navigateToUrl(previousUrl, false);
    }
  }
});

refreshButton.addEventListener("click", function() {
  if (browserHistory.length > 0 && currentHistoryPosition >= 0) {
    const currentUrl = browserHistory[currentHistoryPosition];
    navigateToUrl(currentUrl, false);
  } else {
    navigateToUrl("", false);
  }
});

// Document ready functionality
document.addEventListener('DOMContentLoaded', function() {
  // Handle construction links
  document.body.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('construction-link')) {
      e.preventDefault();
      navigateToUrl("under-construction");
    }

    // Article read more handler
    if (e.target && e.target.classList.contains('bf-read-more')) {
      e.preventDefault();
      document.querySelector('.battlefieldcenterz').classList.remove('active');
      const articlePage = document.querySelector('.battlefield-article');
      if (articlePage) {
        articlePage.classList.add('active');
      }
    }

    // Article back button handler
    if (e.target && (e.target.classList.contains('bf-back-button') || e.target.id === 'back-to-home')) {
      e.preventDefault();
      document.querySelector('.battlefield-article').classList.remove('active');
      document.querySelector('.battlefieldcenterz').classList.add('active');
    }

    // Handle hidden URL parts to make them more interactive
    if (e.target && (e.target.id === 'first-url-part' || e.target.id === 'second-url-part')) {
      // Make the URL parts more noticeable when clicked
      e.target.style.color = '#ffffff';
      e.target.style.fontWeight = 'bold';
    }
  });
    
  // Home button functionality - find all HOME links in the navigation
  const homeLinks = document.querySelectorAll('.bf-nav a:first-child');
  homeLinks.forEach(link => {
    link.classList.remove('construction-link');
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // If we're in the article view, go back to the main page
      document.querySelector('.battlefield-article')?.classList.remove('active');
      document.querySelector('.battlefieldcenterz')?.classList.add('active');
    });
  });
  
  // Browser home button functionality
  const homeButton = document.querySelector(".browser-button:nth-child(4)"); // Select the Home button
  homeButton.addEventListener("click", function(e) {
    e.preventDefault();
    // Reset to welcome page
    document.querySelectorAll(".website-content").forEach(content => {
      content.classList.remove("active");
    });
    document.querySelector(".default-content").classList.add("active");
    addressBar.value = "";
  });
  
  // Initial state
  if (browserWindow.style.display !== "none") {
    navigateToUrl("", false);
  }
});

// Window focus handlers
txtWindow.addEventListener("mousedown", function() {
  bringWindowToFront(this);
});

browserWindow.addEventListener("mousedown", function() {
  bringWindowToFront(this);
});

function setupChaosForumNavigation() {
  // When the ChaosTheoryForum section is displayed, set up navigation
  document.body.addEventListener('click', function(e) {
    // Handle clicks on conspiracy theory link
    if (e.target && e.target.classList.contains('chaos-conspiracy-link')) {
      e.preventDefault();
      e.stopPropagation();
      
      // Make sure we're in the forum page
      document.querySelector('.ChaosTheoryForum').classList.add('active');
      
      // Hide the main forum content and show the conspiracy page
      document.querySelector('#chaos-main-page').style.display = 'none';
      document.querySelector('#chaos-conspiracy-page').style.display = 'block';
      
      // Update browser history to make back button work correctly
      if (addressBar.value === "https://www.chaostheoryforums.com") {
        // Create a special URL for the conspiracy page that doesn't actually navigate
        browserHistory.push("https://www.chaostheoryforums.com/conspiracy");
        currentHistoryPosition = browserHistory.length - 1;
        addressBar.value = "https://www.chaostheoryforums.com/conspiracy";
      }
    }
    
    // Navigation back to main forum page
    if (e.target && e.target.classList.contains('chaos-home-link')) {
      e.preventDefault();
      e.stopPropagation();
      
      // Hide the conspiracy page and show the main forum
      document.querySelector('#chaos-conspiracy-page').style.display = 'none';
      document.querySelector('#chaos-main-page').style.display = 'block';
      
      // Update browser history
      if (addressBar.value === "https://www.chaostheoryforums.com/conspiracy") {
        navigateToUrl("https://www.chaostheoryforums.com", true);
      }
    }
  });
  
  // Add handler for the hidden link in the conspiracy page
  const hiddenLinks = document.querySelectorAll('.chaos-hidden-link');
  hiddenLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      if (this.href && this.href.includes('HuntTheWitch.com')) {
        navigateToUrl("https://www.HuntTheWitch.com");
      }
    });
  });
}

function integrateChaosForum() {
  setupChaosForumNavigation();
}