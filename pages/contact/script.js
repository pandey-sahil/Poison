function ballDrag() {
    const container = document.querySelector(".contact-hero");
    const dragBalls = document.querySelectorAll(".contact-drag-ball");
  
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
  
        dragBalls.forEach(ball => {
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
  

  ballDrag()





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