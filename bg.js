const body = document.querySelector("body");

const IMAGE_NUM = 7;

function paintImg(randomNumber) {
    const image = new Image();
    image.src = `images/${randomNumber}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genNumber() {
    const num = Math.ceil(Math.random() * IMAGE_NUM);
    return num;
}

function init() {
    const randomNumber = genNumber();
    paintImg(randomNumber);
}

init();