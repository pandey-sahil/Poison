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

function workAnimation() {
  const workShow = document.querySelectorAll(".work-show");

  workShow.forEach((work, index) => {
    const workImage = work.querySelectorAll(".work-image");

    gsap.from(work, {
      opacity: 0,
      x: "-100%",
      duration: 1,
      stagger: 1,
      scrollTrigger: {
        trigger: work,
        start: "top 90%",
        end: "top 30%",

        scroller: ".smooth-scroll",
      },
    });
    work.addEventListener("mouseenter", () => {
      gsap.to(workImage, {
        opacity: 1,
        rotate: "5deg",
        left: "50%",
        scale: 1,
        transformOrigin: "center",
        duration: 0.5,
      });
    });
    work.addEventListener("mouseleave", () => {
      gsap.to(workImage, {
        opacity: 0,
        rotate: "0deg",
        left: "30%",
        scale: 0,
        duration: 0.5,
      });
    });
  });
}

workAnimation();
