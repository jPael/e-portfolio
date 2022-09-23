class Box {
	constructor(width, height) {
		this.boxes = []; // array of boxes
		this.width = width;
		this.height = height;
		this.colors = ["#FFBD00", "#FF5400", "#FF0054", "#9E0059", "#390099"];
		// this.onTop = false;
	}

	newBox(x, y) {
		const shape = ["circle", "rectangle"];
		while (true) {
			for (let i = 0; i < this.boxes.length; i++) {
				let other = this.boxes[i];

				if (x < other.x + other.sizew && x + other.sizew > other.x && y < other.y + other.sizeh && y + other.sizeh > other.y) {
					continue;
				}
			}

			const incrementSize = Math.random() * 0.01 + 0.06;

			let incrementX = x > this.width / 2 ? -1 : 0;
			let incrementY = y > this.height / 2 ? -1 : 0;
			let incrementW = x > this.width / 2 ? 1 : 1;
			let incrementH = y > this.width / 2 ? 1 : 1;

			this.boxes.push({
				x: x,
				y: y,
				sizeh: 5,
				sizew: 5,
				incrementSize: incrementSize,
				color: this.randomColor(),
				incrementWidth: incrementW,
				incrementHeight: incrementH,
				incrementX: incrementX,
				incrementY: incrementY,
				shiftX: 0,
				shiftY: 0,
				shape: shape[Math.floor(Math.random() * 3) % 3 == 0 ? 1 : 0],
			});
			break;
		}
		// console.log(this.boxes);
	}

	randomColor() {
		return this.colors[Math.floor(Math.random() * this.colors.length)];
	}

	updateXY(x, y) {
		this.boxes.forEach((box) => {
			box.shiftX = x;
			box.shiftY = y;
		});
	}

	mouseOnTop(mx, my) {
		let i = null;

		for (let i = 0; i < this.boxes.length; i++) {
			const x = this.boxes[i].x;
			const y = this.boxes[i].y;
			const w = this.boxes[i].sizew;
			const h = this.boxes[i].sizeh;

			if (
				mx <= x + w && // check if mouse touches the right side of the box
				mx >= x && // check if mouse touches the left side of the box
				my <= y + h && // check if mouse touches the bottom side of the box
				my >= y // check if the mouse touches the top side of the box
			) {
				return i;
				break;
			}
		}
		return null;
	}

	changeColor(i) {
		const currColor = this.boxes[i].color;

		while (true) {
			const newColor = this.randomColor();
			if (newColor != currColor) {
				this.boxes[i].color = newColor;
				// console.log(currColor, newColor);
				if (this.boxes[i].shape == "rectangle") {
					this.boxes[i].shape = "circle";
				} else {
					this.boxes[i].shape = "rectangle";
				}
				break;
			}
		}

		// this.boxes[i].color = this.randomColor();

		// console.log(i, this.boxes[i]);
	}

	update() {
		let margin = 15;
		this.boxes.forEach((box) => {
			this.boxes.forEach((other) => {
				if (box != other) {
					if (
						// check if the box touches the other boxes
						box.x < other.x + other.sizew + margin &&
						box.x + box.sizew + margin > other.x &&
						box.y < other.y + other.sizeh + margin &&
						box.y + box.sizeh + margin > other.y
						// also check if the box touches the sides of the screen
					) {
						box.incrementX = 0;
						box.incrementY = 0;
						box.incrementWidth = 0;
						box.incrementHeight = 0;
					} else {
						box.sizeh += box.incrementSize * box.incrementHeight;
						box.sizew += box.incrementSize * box.incrementWidth;
						box.x += box.incrementSize * box.incrementX;
						box.y += box.incrementSize * box.incrementY;
					}
				}
			});

			// box.sizeh += box.incrementSize * box.incrementHeight;
			// box.sizew += box.incrementSize * box.incrementWidth;
			// box.x += box.incrementSize * box.incrementX;
			// box.y += box.incrementSize * box.incrementY;
		});
	}

	draw(ctx) {
		this.boxes.forEach((box) => {
			if (box.shape == "rectangle") {
				ctx.fillStyle = box.color;
				ctx.fillRect(box.x + box.shiftX * -1, box.y + box.shiftY * -1, box.sizew, box.sizeh);
			} else {
				ctx.fillStyle = box.color;
				ctx.beginPath();
				ctx.arc(box.x + box.sizeh / 2 + box.shiftX * -1, box.y + box.sizeh / 2 + box.shiftY * -1, box.sizew / 2, 0, 2 * Math.PI);
				ctx.fill();
			}
		});
	}
}
