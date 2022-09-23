const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// const bound = canvas.getBoundingClientRect();

const canvas_height = window.innerHeight;
const canvas_width = window.innerWidth;

canvas.height = canvas_height;
canvas.width = canvas_width;

var boxes = new Box(canvas_width, canvas_height);
var utils = new Utils();

// var play = false;

var box = null;

// var change = false
window.onmousemove = (event) => {
	const mouseX = event.clientX;
	const mouseY = event.clientY;

	const newXY = utils.mag(mouseX, mouseY, 20);

	let farthest = 0;
	boxes.boxes.forEach((box) => {
		const d = utils.distance(mouseX, mouseY, box.x, box.y);

		if (d > farthest) {
			farthest = d;
		}
	});

	//#### TODO: create the parallax effect

	// let shift = 1000 / distance(newXY.x, newXY.y, mouseX, mouseY);

	// const x = (newXY.x - 5) * shift;
	// const y = (newXY.y - 5) * shift;
	const x = newXY.x - 5;
	const y = newXY.y - 5;

	// console.log(shift, x, y);

	boxes.updateXY(x, y);

	checkOnTop(mouseX, mouseY);
};

for (let i = 0; i < 20; i++) {
	const marginPercent = 9;
	let x = Math.floor(utils.random(canvas_width / marginPercent, canvas_width - canvas_width / marginPercent));
	let y = Math.floor(utils.random(canvas_height / marginPercent, canvas_height - canvas_height / marginPercent));

	boxes.newBox(x, y);
}

var animate = setInterval(() => {
	// if (play) {
	draw();
	// }
}, 1000 / 60);
// }, (interval = 1000 / 60);

function draw() {
	ctx.clearRect(0, 0, canvas_width, canvas_height);
	boxes.draw(ctx);
	boxes.update();
	// requestAnimationFrame(draw);
}

function checkOnTop(x, y) {
	let curr = boxes.mouseOnTop(x, y);
	if (curr != box && curr != null) {
		box = curr;
		boxes.changeColor(box);
	}
	// if (curr != false) {
	// 	if (box == null) {
	// 		box = curr;
	// 		boxes.changeColor(box);
	// 	} else if (box != curr) {
	// 		boxes.changeColor(box);
	// 		box = curr;
	// 	}
	// }
}
