const aboutSection = document.getElementById("about");

const treshold = 0.7;

gsap.fromTo(
	aboutSection,
	{ opacity: 0 },
	{
		duration: 3,
		opacity: 1,
		y: 0,
	}
);

const options = {
	root: null,
	rootMargin: "0px",
	treshold: treshold,
};

const observer = new IntersectionObserver(animHandler, options);
const targets = document.querySelectorAll("section");
const ar = [].slice.call(targets);
let animations = [];

let count = 0;

for (let target of ar) {
	animations[count] = new TimelineMax({ paused: true });
	observer.observe(target);
	count++;
}

animations[0];

animations[1].to("#skills", { x: 200, delay: 3, duration: 5, ease: Sine.easeOut });

// animations[2].to("#apple", 2, { scale: 0.4, ease: Sine.easeOut }).to("#small", 1, { scale: 0.5, transformOrigin: "center" }, 0);

function animHandler(targets, observer) {
	for (let entry of targets) {
		let i = ar.indexOf(entry.target);
		if (entry.isIntersecting) {
			animations.forEach((tl) => {
				tl.pause(0);
			});
			animations[i].play();
		} else {
			animation[i].reverse();
		}
	}
}
