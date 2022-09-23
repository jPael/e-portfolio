class Utils {
	distance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}

	random(min, max) {
		return min + Math.random() * (max - min);
	}

	mag(x, y, max) {
		const nx = x / (canvas_width / max);
		const ny = y / (canvas_height / max);

		return { x: nx, y: ny };
	}
}
