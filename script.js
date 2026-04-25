const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');

let userImg = new Image();
let frameImg = new Image();
frameImg.src = 'frame.png'; // Make sure this matches your file name exactly!

let posX = 0, posY = 0, scale = 1;

// 1. THIS FIXES THE BLANK LOOK: Draw the frame as soon as it loads
frameImg.onload = () => {
    draw(); 
};

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (userImg.src && userImg.complete) {
        // 2. THIS FIXES THE MISSING PHOTO: Draw user photo
        // We use the scale and position variables
        ctx.drawImage(userImg, posX, posY, canvas.width * scale, canvas.height * scale);
    }
    
    // Always draw the frame on top
    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
}

upload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (f) => {
        userImg = new Image();
        userImg.onload = () => {
            // Reset position and scale for the new photo
            scale = 1;
            posX = 0;
            posY = 0;
            draw();
        };
        userImg.src = f.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

// Helper function for your buttons (Move/Zoom)
function adjust(type) {
    if (type === 'plus') scale += 0.05;
    if (type === 'minus') scale -= 0.05;
    if (type === 'up') posY -= 20;
    if (type === 'down') posY += 20;
    if (type === 'left') posX -= 20;
    if (type === 'right') posX += 20;
    draw();
}
