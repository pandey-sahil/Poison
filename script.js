function initLocomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
  });

  // Sync Locomotive Scroll and ScrollTrigger
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".smooth-scroll").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

initLocomotiveScroll();


function heroSlider() {
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
}

heroSlider();

function ballDrag() {
  const container = document.querySelector(".hero-text-container");
  const ball = document.querySelector(".drag-ball");

  let velocity = { x: 0, y: 0 }; // Manual inertia
  let lastPosition = { x: 0, y: 0 }; // Track the last known position

  // Create Draggable instance
  Draggable.create(ball, {
    type: "x,y",
    bounds: container,
    onDragStart: function () {
      // Stop animations when dragging starts
      gsap.killTweensOf(ball);
      velocity = { x: 0, y: 0 };
    },
    onDrag: function () {
      // Calculate velocity manually
      const currentPosition = { x: this.x, y: this.y };
      velocity = {
        x: currentPosition.x - lastPosition.x,
        y: currentPosition.y - lastPosition.y,
      };
      lastPosition = currentPosition;
    },
    onDragEnd: function () {
      // Apply manual inertia on drag release
      gsap.to(ball, {
        x: `+=${velocity.x * 10}`,
        y: `+=${velocity.y * 10}`,
        duration: 1,
        ease: "power2.out",
      });
    },
  });

  // Update ball position on window scroll
  window.addEventListener("scroll", () => {
    const scrollOffset = window.scrollY;
    const currentPosition = ball.getBoundingClientRect();
    const containerBounds = container.getBoundingClientRect();

    const newLeft = currentPosition.left - containerBounds.left;
    const newTop = currentPosition.top - containerBounds.top + scrollOffset;

    // Adjust GSAP's internal tracking
    gsap.set(ball, { x: newLeft, y: newTop });
  });
}

ballDrag();

function animateHeroText() {
  gsap.from(".hero-text-container h1", {
    x: "100%",
    opacity: 0,
    duration: .9,
    scrollTrigger: {
      trigger: ".hero-text-container",
      start: "top center",
      end: "top 1%",
      markers: true,
      scroller: ".smooth-scroll",
    },
  });
}

animateHeroText();
