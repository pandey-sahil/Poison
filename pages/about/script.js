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
gsap.to(".hero-cards-container", {
    y: "-100%",
    duration: 20,
    scrollTrigger: {
        trigger: ".about-hero",
        start: "top 0",
        end: "top -100%",
        pin: true,
        markers: true,
        scrub: 0.9,
        scroller: ".smooth-scroll", // Ensure Locomotive Scroll scroller is used
    },
});



const cards = document.querySelectorAll(".magnet-card-container");

cards.forEach((card, index) => {
    gsap.to(card, {
        opacity: 1, // Fade in
        rotate: index % 2 === 0 ? -15 : 15, // Alternate rotation
        x: index % 2 === 0 ? -50 : 50, // Alternate horizontal shift
        y: 0, // Move back to the original position
        duration: 2, // Duration of the animation
        scrollTrigger: {
            trigger: card, // Each card triggers its own animation
            start: "top 80%", // Start animation when card reaches 80% of the viewport height
            end: "top 60%", // End animation when card reaches 60% of the viewport height
            scrub: true, // Smooth animation tied to scroll
            markers: true, // Display markers for debugging (remove later)
        },
    });
});