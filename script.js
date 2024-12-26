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

// Hero Slider Functionality
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
      duration: 1.3,
      ease: "power1.inOut",
    });
  }

  // Initial setup
  gsap.set(slider, { x: 0 });

  // Set interval to slide to the next image every 3 seconds
  setInterval(showNextImage, 3000);
}

heroSlider();

// Ball Dragging with GSAP
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

// Animate Hero Text on Scroll
function animateHeroText() {
  gsap.from(".hero-text-container h1", {
    x: "100%",
    opacity: 0,
    duration: 0.9,
    scrollTrigger: {
      trigger: ".hero-text-container",
      start: "top center",
      end: "top 1%",
      scroller: ".smooth-scroll", // Ensure Locomotive Scroll scroller is used
    },
  });
}

animateHeroText();





function initPage2Animation() {
  let sections = document.querySelectorAll(".page2-image-section");

  gsap.from(".page2-image-section, .pg2-image-text", {
    x: -50,
    opacity: 0,
    duration: 5,
    scrollTrigger: {
      trigger: ".image-section-container",
      start: "top 70%",
      scroller: ".smooth-scroll", 
      end: "top 30%",
      scrub: true,
    }
  });

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".image-section-container",
      start: "top top",
      scroller: ".smooth-scroll", 
      end: "top -150%",
      scrub: true,
      pin: true,
    }
  });

  sections.forEach((section, index) => {
    timeline.to(section, {
      top: "0",
      duration: 20,
      ease: "easeInOut",
      stagger: 1
    });
  });



}

initPage2Animation();

