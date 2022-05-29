let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;
let brushSizeEl = document.getElementById("brush-size");
let brushSize = brushSizeEl.value;
let brushColorEl = document.getElementById("brush-color");
let brushColor = brushColorEl.value;
let mode = "pen";

let titleElement = document.getElementById("title");
let isMouseDown = false;
let startX = 0;
let startY = 0;

function getBrushSize() {
	brushSize = brushSizeEl.value;
}

function getBrushColor() {
	brushColor = brushColorEl.value;
}

function mouseDown(event) {
	startX = event.clientX;
	startY = event.clientY;
	isMouseDown = true;
}

function letToDraw(event) {
	if (isMouseDown) {
		draw(event);
		titleElement.style.display = "none";
	}
}

function draw(event) {
	let endX = event.clientX;
	let endY = event.clientY;
	ctx.beginPath();
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.lineWidth = brushSize;
	ctx.strokeStyle = brushColor;
	if (mode === "pen") {
		ctx.globalCompositeOperation = "source-over";
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
		startX = event.offsetX;
		startY = event.offsetY;
	} else {
		ctx.globalCompositeOperation = "destination-out";
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
		startX = event.offsetX;
		startY = event.offsetY;
	}
}

function setBgColor() {
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = bColorEl.value;
	ctx.fill();
}

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () =>
	ctx.clearRect(0, 0, canvas.width, canvas.height)
);

let penButton = document.getElementById("pen");
penButton.addEventListener("click", () => (mode = "pen"));
let eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", () => (mode = "erase"));

let bColorEl = document.getElementById("background-color");
let bColor = bColorEl.value;
bColorEl.addEventListener("change", setBgColor);

canvas.addEventListener("mousedown", mouseDown);
canvas.addEventListener("mousemove", letToDraw);
canvas.addEventListener("mouseup", () => (isMouseDown = false));
canvas.addEventListener("mouseout", () => (isMouseDown = false));
brushSizeEl.addEventListener("change", getBrushSize);
brushColorEl.addEventListener("change", getBrushColor);

let cursor = document.getElementById("cursor");
function displayCursor(event) {
	let x = event.pageX - brushSize / 2;
	let y = event.pageY - brushSize / 2;
	cursor.style.width = brushSize + "px";
	cursor.style.height = brushSize + "px";
	cursor.style.borderRadius = brushSize + "px";
	cursor.style.top = y + "px";
	cursor.style.left = x + "px";
}
canvas.addEventListener("mousemove", displayCursor);
