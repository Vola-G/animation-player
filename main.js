const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let curentColor = '';
const colorPicker = document.getElementById('color');
const frameBar = document.getElementsByClassName('frames-bar')[0];
const frames = frameBar.getElementsByClassName('frame');
const addFrameBtn = document.getElementById('addFrame');
const fpsInput = document.querySelector('input[type="range"]');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const animationContainer = document.getElementById('animation-container');
let count = 0;

const deleteFrame = (e) => {
    let target = e.target;
    while (target != frameBar) {
        if (target.className === 'frame-container') {
            target.parentNode.removeChild(target);
            count--;
        }
        target = target.parentNode;
    }
}

const copyFrame = (e) => {
    let target = e.target;
    while(target != frameBar) {
        if (target.className === 'frame-container') {
            const frameContainerClone = target.cloneNode(true);
            target.parentNode.insertBefore(frameContainerClone, target.nextElementSibling);
            startAnimation();
        }
        target = target.parentNode;
    }
}

function addFrame() {
    const frameContainer = document.createElement('div');
    frameContainer.classList.add('frame-container');
    const frameCount = document.createElement('button');
    frameCount.classList.add('frame-count');
    const frameCountInner = document.createElement('span');
    const imageFrame = document.createElement('img');
    imageFrame.classList.add('frame');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    const copyBtn = document.createElement('button');
    copyBtn.classList.add('copy-btn');
    frameBar.appendChild(frameContainer);
    imageFrame.src = canvas.toDataURL();
    frameContainer.appendChild(imageFrame);
    count++;
    frameCountInner.innerHTML = count;
    frameContainer.appendChild(frameCount);
    frameCount.appendChild(frameCountInner);
    frameContainer.appendChild(deleteBtn);
    frameContainer.appendChild(copyBtn);
    startAnimation();
    deleteBtn.addEventListener('click', deleteFrame);
    copyBtn.addEventListener('click', copyFrame);
}

addFrameBtn.addEventListener('click', addFrame);

function openFullScreen(element) {
    element.requestFullscreen();
}

fullscreenBtn.onclick = () => {
    openFullScreen(animationContainer);
}


const fpsInputValue = () =>{
  const currentValue = fpsInput.value;
  const displayFps = document.querySelector('.fps');
  displayFps.innerHTML = 'FPS: ' + currentValue;
  startAnimation();
}

fpsInput.addEventListener("input", fpsInputValue);

const startAnimation = () => {
const fps = fpsInput.value;
    for (let i = 0; i < frames.length; i++) {
        const timer = setInterval( function() {
            const currentImg = frames[i].cloneNode();
            currentImg.style.width = "200px";
            currentImg.style.height = "200px";
            if (animationContainer.childNodes.length > 0) animationContainer.removeChild(animationContainer.firstChild);
                animationContainer.appendChild(currentImg);
        }, 2000 / fps)
        // if (timer) {
        //     clearInterval(timer);
        // }
    }
}

colorPicker.addEventListener('input', () => {
    curentColor = colorPicker.value;
});

canvas.onmousedown = (e) => {
    canvas.onmousemove = (e) => {
        const x = e.offsetX;
        const y = e.offsetY;
        ctx.fillStyle = curentColor;
        ctx.fillRect(x-5, y-5, 10, 10);
        ctx.fill();
    }
    canvas.onmouseup = () => {
        canvas.onmousemove = null;
    }
};


