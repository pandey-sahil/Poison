// Check for responsive state
const isMobile = () => window.innerWidth <= 768;
const isTablet = () => window.innerWidth <= 1024 && window.innerWidth > 768;

// Initialize Locomotive Scroll with responsive settings
function initLocomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
    smoothMobile: {
      smooth: false,
      breakpoint: 768,
    },
    tablet: {
      smooth: true,
      breakpoint: 1024,
      smoothMobile: true,
    },
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

  return locoScroll;
}

function navAnime() {
  const navTrigger = document.querySelector(".navTrigger");
  const bars = document.querySelectorAll(".navTrigger i");
  const mobileNav = document.querySelector(".mobile-nav");
  const menu = document.querySelector(".menu");
  let isNavVisible = false;

 
  const navTl = gsap.timeline({ paused: true });
  navTl
    .to(bars[0], { y: 9, rotation: 135, duration: 0.3, ease: "power2.inOut" })
    .to(bars[1], { opacity: 0, duration: 0.3, ease: "power2.inOut" }, 0)
    .to(
      bars[2],
      { y: -9, rotation: 45, duration: 0.3, ease: "power2.inOut" },
      0
    );

  menu.addEventListener("click", () => {
    navTrigger.classList.toggle("active");
    mobileNav.classList.toggle("active");

    if (navTrigger.classList.contains("active")) {
      navTl.play();
      isNavVisible = true;
    } else {
      navTl.reverse();
      isNavVisible = false;
    }
  });
}

navAnime();

// Hero Slider with responsive handling
function heroSlider() {
  const slider = document.querySelector(".hero-image-section");
  const images = Array.from(slider.children);
  let currentIndex = 0;

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;

    const translateValue = isMobile() ? `-${window.innerWidth}px` : "-100%";

    gsap.to(slider, {
      x: translateValue,
      duration: isMobile() ? 0.8 : 1,
      ease: "power1.inOut",
    });
  }

  gsap.set(slider, { x: 0 });
  setInterval(showNextImage, 3000);
}

// Ball Dragging with responsive bounds
function ballDrag() {
  const container = document.querySelector(".hero-text-container");
  const ball = document.querySelector(".drag-ball");

  let velocity = { x: 0, y: 0 };
  let lastPosition = { x: 0, y: 0 };

  function updateDraggable() {
    const bounds = isMobile()
      ? {
          top: 0,
          left: 0,
          width: window.innerWidth * 0.8,
          height: window.innerHeight * 0.5,
        }
      : container;

    Draggable.create(ball, {
      type: "x,y",
      bounds: bounds,
      inertia: true,
      onDragStart: function () {
        gsap.killTweensOf(ball);
        velocity = { x: 0, y: 0 };
      },
      onDrag: function () {
        const currentPosition = { x: this.x, y: this.y };
        velocity = {
          x: currentPosition.x - lastPosition.x,
          y: currentPosition.y - lastPosition.y,
        };
        lastPosition = currentPosition;
      },
      onDragEnd: function () {
        const multiplier = isMobile() ? 5 : 10;
        gsap.to(ball, {
          x: `+=${velocity.x * multiplier}`,
          y: `+=${velocity.y * multiplier}`,
          duration: isMobile() ? 0.5 : 1,
          ease: "elastic.out(0.4, 0.2)",
        });
      },
    });
  }

  updateDraggable();

  window.addEventListener("scroll", () => {
    const scrollOffset = window.scrollY;
    const currentPosition = ball.getBoundingClientRect();
    const containerBounds = container.getBoundingClientRect();

    const newLeft = currentPosition.left - containerBounds.left;
    const newTop = currentPosition.top - containerBounds.top + scrollOffset;

    gsap.set(ball, { x: newLeft, y: newTop });
  });

  window.addEventListener("resize", updateDraggable);
}

// Hero Text Animation
function animateHeroText() {
  gsap.from(".nav", {
    y: "-100%",
    opacity: 0,
    duration:1.2,
  });


  gsap.from(".hero-text-container h1", {
    x: isMobile() ? "50%" : "100%",
    opacity: 0,
    duration: isMobile() ? 0.8 : 1.2,
  });
  gsap.from(".hero-slider-container", {
    x: isMobile() ? "-50%" : "-100%",
    opacity: 0,
    duration: isMobile() ? 0.8 : 1.2,
  });
}

// Page 2 Animation with responsive values
function initPage2Animation() {
  let sections = document.querySelectorAll(".page2-image-section");

  gsap.from(".page2-image-section, .pg2-image-text", {
    x: isMobile() ? -20 : -50,
    opacity: 0,
    duration: isMobile() ? 3 : 5,
    scrollTrigger: {
      trigger: ".image-section-container",
      start: isMobile() ? "top 85%" : "top 70%",
      scroller: ".smooth-scroll",
      end: isMobile() ? "top 40%" : "top 30%",
      scrub: true,
    },
  });

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".image-section",
      start: "top 0%",
      scroller: ".smooth-scroll",
      end: "top -100%",
      scrub: true,
      pin: true,
    },
  });

  sections.forEach((section) => {
    console.log(section);
    const sectionText = section.querySelector(".pg2-image-text-overly");

    gsap.from(sectionText, {
      x: isMobile() ? -30 : -60,
      opacity: 0,
      duration: isMobile() ? 3 : 5,
      scrollTrigger: {
        trigger: section,
        start: isMobile() ? "top 85%" : "top 80%",
        scroller: ".smooth-scroll",
        end: isMobile() ? "top 40%" : "top 30%",
      },
    });

    timeline.to(section, {
      top: "0",
      duration: isMobile() ? 30 : 60,
      ease: "easeInOut",
      stagger: 1,
    });
  });
}

// Marquee Animation with responsive handling
function marqueeAnimation() {
  let marqueeTextRight = document.querySelectorAll(".marquee-text-right");
  let marqueeTextLeft = document.querySelector(".marquee-text-left");

  const duration = isMobile() ? 10 : 20;
  const movement = isMobile() ? "25%" : "50%";

  marqueeTextRight.forEach((element) => {
    gsap.to(element, {
      x: `-${movement}`,
      duration: duration,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee-section",
        start: "top 90%",
        end:"top -25%",
        scrub: 2,
        scroller: ".smooth-scroll",
      },
    });
  });

  gsap.to(marqueeTextLeft, {
    x: movement,
    duration: duration,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee-section",
      start: "top 90%",
      end:"top -25%",
      scrub: 2,
      scroller: ".smooth-scroll",
    },
  });

  gsap.to(".our-team-container", {
    y: "-90%",
    duration: duration,
    scrollTrigger: {
      trigger: ".our-team-section",
      start: "top 0%",
      end: "top -50%",
      scrub: 2,
      pin: true,
      scroller: ".smooth-scroll",
    },
  });
}

// Magnet Cards Animation
function initMagnetCards() {
  const droppables = document.querySelectorAll(".magnet-card");
  const bound = document.querySelector(".magnet-card-section");

  gsap.registerPlugin(Draggable, ScrollTrigger);

  droppables.forEach((droppable) => {
    let droppableContainer = droppable.closest(".magnet-card-container");

    gsap.from(droppable, {
      y: isMobile() ? "50%" : "100%",
      duration: isMobile() ? 15 : 30,
      opacity: 0,
      rotateY: isMobile() ? 90 : 180,
      clearProps: "all",
      scrollTrigger: {
        trigger: droppableContainer,
        start: isMobile() ? "top 90%" : "top 80%",
        end: isMobile() ? "top 20%" : "top 0%",
        scrub: isMobile() ? 3 : 6,
        scroller: ".smooth-scroll",
      },
    });

    Draggable.create(droppable, {
      type: "x,y",
      bounds: bound,
      inertia: true,
      clearProps: "all",
      onDragEnd: function () {
        gsap.to(this.target, {
          duration: isMobile() ? 0.3 : 0.5,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)",
        });
      },
    });
  });
}

// Team Marquee Background
function initTeamMarquee() {
  const marquee = document.querySelector(".our-team-marquee-bg");
  const items = document.querySelectorAll(".text-lg-184");

  marquee.innerHTML += marquee.innerHTML;
  const totalWidth = Array.from(items).reduce(
    (acc, item) => acc + item.offsetWidth,
    0
  );

  gsap.to(".our-team-marquee-bg", {
    x: -totalWidth,
    duration: isMobile() ? 10 : 15,
    repeat: -1,
    ease: "linear",
  });
}

// Footer Animation
function footerAnimation() {
  gsap.from(".footer-wrapper", {
    x: "-90%",
    opacity: 0,
    duration: 10,
    scrollTrigger: {
      trigger: ".footer-section",
      start: "top 80%",
      end: "top 50%",
      scrub: 2,
      scroller: ".smooth-scroll",
    },
  });
}

// Initialize everything
function init() {
  const locoScroll = initLocomotiveScroll();
  navAnime();
  heroSlider();
  ballDrag();
  animateHeroText();
  initPage2Animation();
  marqueeAnimation();
  footerAnimation();
  initTeamMarquee();
  
  if(window.innerWidth > 768){
    console.log("hello")
    initMagnetCards()
  }else{
    
  }
  // Refresh Locomotive Scroll on resize
  window.addEventListener("resize", () => {
    locoScroll.update();
    ScrollTrigger.refresh();
  });
}

// Start animations on load
window.addEventListener("load", init);
