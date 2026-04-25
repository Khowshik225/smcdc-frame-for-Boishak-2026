const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const upload = document.getElementById('upload');
const frameImg = new Image();
frameImg.src = 'frame.png'; // Path to your club's frame

upload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const userImg = new Image();
        userImg.onload = () => {
            // 1. Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // 2. Draw User Photo
            ctx.drawImage(userImg, 0, 0, 1080, 1080);
            // 3. Draw Frame on top
            ctx.drawImage(frameImg, 0, 0, 1080, 1080);
        };
        userImg.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});