const canvas = document.querySelector('.canvas');
const colorPicker = document.getElementById('colorPicker');
const showBorder = document.getElementById('showBorder');
let currentColor = colorPicker.value;
let socket;
const publishableKey = "pk_test_a25vd2luZy1jb3JnaS00MS5jbGVyay5hY2NvdW50cy5kZXYk"; // <- Add Publishable Key here

const startClerk = async () => {
  const Clerk = window.Clerk;

  try {
    // Load Clerk environment and session if available
    await Clerk.load();

    const userButton = document.getElementById("user-button");
    const authLinks = document.getElementById("auth-links");

    Clerk.addListener(({ user }) => {
      // Display links conditionally based on user state
      authLinks.style.display = user ? "none" : "block";
    });

    if (Clerk.user) {
      // Mount user button component
      Clerk.mountUserButton(userButton);
      userButton.style.margin = "auto";
    }
  } catch (err) {
    console.error("Error starting Clerk: ", err);
  }
};


function initializeCanvas(data) {
  for (let i = 0; i < 200; i++) {
    for (let j = 0; j < 400; j++) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.classList.add('pixelBorder');
      pixel.setAttribute('data-x', i);
      pixel.setAttribute('data-y', j);
      pixel.setAttribute('data-time', '0');
      pixel.style.backgroundColor = data[`${i},${j}`].color;
      pixel.addEventListener('click', handlePixelClick);
      canvas.appendChild(pixel);
    }
  }
  doAction = updateCanvas;
}

function updateCanvas(data) {
  const pixel = document.querySelector(`.pixel[data-x="${data.x}"][data-y="${data.y}"]`);
  if (pixel.dataset.time >= data.time) return;
  pixel.style.backgroundColor = data.color;
  pixel.dataset.time = data.time;
}

function handlePixelClick(event) {
  if (!Clerk.user) {
    Clerk.openSignIn()
    return;
  }
  const pixel = event.target;
  pixel.style.backgroundColor = currentColor;
  const pixelData = {
    x: pixel.dataset.x,
    y: pixel.dataset.y,
    color: currentColor,
    user: Clerk.user.id,
  };
  socket.send(JSON.stringify({ "action": "sendmessage", "message": pixelData }));
}

colorPicker.addEventListener('input', function () {
  currentColor = colorPicker.value;
});

showBorder.addEventListener('change', function () {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(pixel => {
    if (showBorder.checked) {
      pixel.classList.add('pixelBorder');
    } else {
      pixel.classList.remove('pixelBorder');
    }
  });
});

function connectWebSocket() {
  socket = new WebSocket('ws://localhost:8080');

  socket.addEventListener('open', () => {
      initializeCanvas();
  });

  socket.addEventListener('error', () => {
      const errorMessage = document.querySelector('.error-message');
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Failed to connect to server';
  });

  let doAction = initializeCanvas;

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    doAction(data);
  });

  const dummyData = {}
  for (let i = 0; i < 200; i++) {
    for (let j = 0; j < 400; j++) {
      dummyData[`${i},${j}`] = {
        color: 'white',
      }
    }
  }
  initializeCanvas(dummyData);
}


(() => {
  const script = document.createElement("script");
  script.setAttribute("data-clerk-publishable-key", publishableKey);
  script.async = true;
  script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
  script.crossOrigin = "anonymous";
  script.addEventListener("load", startClerk);
  script.addEventListener("error", () => {
    document.getElementById("no-frontend-api-warning").hidden = false;
  });
  document.body.appendChild(script);
})();

connectWebSocket();
