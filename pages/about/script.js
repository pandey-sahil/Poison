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

// Main GSAP timeline for container movement

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-hero",
    start: "top 0",
    end: "top -100%",
    pin: true,
    scrub: 0.9,
    scroller: ".smooth-scroll",
  },
});

tl.to(".hero-cards-container", {
  y: "-100%",
  duration: 20,
}, "aaa");

const cards = document.querySelectorAll(".magnet-card-container");

tl.to(".hero-card-1 , .hero-card-3", {
  rotate: -5,
  x: -200,
  stagger: 1,
  duration: 20,

}, "aaa");
tl.to(".hero-card-2", {
  rotate: 5,
  x: 200,
  duration: 20,

}, "aaa");




let tlPage2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".join-us-section",
    start: "top 0%",
    end: window.innerWidth < 800 ? "top -100%" : "top -150%",
    pin: true,
    scrub: 0.9,
    scroller: ".smooth-scroll",
  },
});

tlPage2.from(".join-us-image", {
  scale: 0.5,
  y: "50%",
  duration: 20,
  ease: "power2.out"
})

.to(".join-us-overlay", {
  y: "-250%",
  duration: 40,
  ease: "power2.inOut"
})

function updateJoinUsAnimation() {
  if (window.innerWidth < 800) {
    tlPage2.scrollTrigger.update({
      end: "top -100%",
      scrub: 0.5
    });
  } else {
    tlPage2.scrollTrigger.update({
      end: "top -150%",
      scrub: 0.9
    });
  }
}

window.addEventListener('resize', updateJoinUsAnimation);
updateJoinUsAnimation();






gsap.from(".our-story-container .text-lg-180, .our-story-section .text-sm-24",{
  x: "-100%",
  opacity:0,
  duration:20,
  stagger:1,
  scrollTrigger: {
    trigger: ".our-story-section",
    start: "top 50%",
    end: "top 30%",
    scrub: 2,
    scroller: ".smooth-scroll",
  }
})