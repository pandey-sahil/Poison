const slider = document.querySelector(".hero-image-section");
const images = Array.from(slider.children);
let currentIndex = 0;

// Move to the next image
function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length;

  // Calculate the new position for infinite loop
  const offset = currentIndex * -100; // -100vw for each slide
  gsap.to(slider, {
    x: `${offset}vw`,
    duration: 2,
    ease: "power1.inOut",
  });
}

// Initial setup
gsap.set(slider, { x: 0 });

// Set interval to slide to the next image every 3 seconds
setInterval(showNextImage, 3000);








console.clear();
gsap.registerPlugin(InertiaPlugin) 
const friction = -1;

const ball = document.querySelector(".drag-ball");
const ballProps = gsap.getProperty(ball);
const radius = ball.getBoundingClientRect().width / 2;

// Use the latest method to track inertia
const tracker = Draggable.create(ball, { type: "x,y", inertia: true })[0];

let vw = window.innerWidth;
let vh = window.innerHeight;

gsap.defaults({
  overwrite: true
});

gsap.set(ball, {
  xPercent: -50,
  yPercent: -50,
  x: vw / 2,
  y: vh / 2
});

const draggable = new Draggable(ball, {
  bounds: window,
  allowContextMenu: true,
  onPress() {
    gsap.killTweensOf(ball);
    this.update(); // Update inertia tracking
  },
  onDragEnd: animateBounce,
  onDragEndParams: []
});

window.addEventListener("resize", () => {
  vw = window.innerWidth;
  vh = window.innerHeight;
});

function animateBounce(x = "+=0", y = "+=0", vx = "auto", vy = "auto") {
  gsap.to(ball, {
    x,
    y,
    inertia: {
      x: {
        velocity: vx,
        max: vw - radius,
        min: radius,
        resistance: 1.5, 
      },
      y: {
        velocity: vy,
        max: vh - radius,
        min: radius,
        resistance: 1.5,
      }
    },
    onUpdate: checkBounds
  });
}

function checkBounds() {
  const r = radius;
  let x = ballProps("x");
  let y = ballProps("y");

  if (x + r > vw || x - r < 0) {
    animateBounce(x < r ? r : vw - r, y, tracker.velocity.x * friction, tracker.velocity.y);
  }

  if (y + r > vh || y - r < 0) {
    animateBounce(x, y < r ? r : vh - r, tracker.velocity.x, tracker.velocity.y * friction);
  }
}
