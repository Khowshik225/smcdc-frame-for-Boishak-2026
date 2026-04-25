const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');

let userImg = new Image();
let frameImg = new Image();
frameImg.src = 'frame.png';

let posX = 0, posY = 0, scale = 1;

frameImg.onload = () => draw();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (userImg.src) {
        // Draw user image at the current coordinates
        ctx.drawImage(userImg, posX, posY, userImg.width * scale, userImg.height * scale);
    }
    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
}

upload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        userImg = new Image();
        userImg.onload = () => {
            // Initial centering: Start photo at (0,0) with scale to fit
            scale = canvas.width / userImg.width;
            posX = 0;
            posY = 0;
            draw();
        };
        userImg.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

function adjust(type) {
    if (type === 'plus') scale += 0.05;
    if (type === 'minus') scale -= 0.05;
    if (type === 'up') posY -= 20;
    if (type === 'down') posY += 20;
    if (type === 'left') posX -= 20;
    if (type === 'right') posX += 20;
    draw();
}

document.getElementById('download').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'SMCDC_Boishak_Profile.png';
    link.href = canvas.toDataURL();
    link.click();
});
