const canvas = document.querySelector('.canvas');
const colorPicker = document.getElementById('colorPicker');
const showBorder = document.getElementById('showBorder');
let currentColor = colorPicker.value;
let socket;

function initializeCanvas() {
    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 400; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.setAttribute('data-x', i);
            pixel.setAttribute('data-y', j);
            canvas.appendChild(pixel);
        }

    }

    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('click', handlePixelClick);
    });
}

function updateCanvas(receivedData) {
    const pixel = document.querySelector(`[data-x="${receivedData.x}"][data-y="${receivedData.y}"]`);
    pixel.style.backgroundColor = receivedData.color;
}

function handlePixelClick(event) {
    const pixel = event.target;
    pixel.style.backgroundColor = currentColor;
    const pixelData = {
        x: pixel.dataset.x,
        y: pixel.dataset.y,
        color: currentColor,
    };
    socket.send(JSON.stringify(pixelData));
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
    // socket = new WebSocket('ws://localhost:8080');

    // socket.addEventListener('open', () => {
    //     initializeCanvas();
    // });

    // socket.addEventListener('error', () => {
    //     const errorMessage = document.querySelector('.error-message');
    //     errorMessage.style.display = 'block';
    //     errorMessage.textContent = 'Failed to connect to server';
    // });

    // socket.addEventListener('message', (event) => {
    //     const receivedData = JSON.parse(event.data);
    //     updateCanvas(receivedData);
    // });
    initializeCanvas();
}

connectWebSocket();
