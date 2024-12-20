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

function matterjs() {
    Draggable.create(".drag-ball", {
        type: "x,y",
        bounds: document.querySelector(".hero-text-container"),
        inertia: true,
        onDragEnd: function () {
            const ball = document.querySelector(".drag-ball");
            const bounds = document.querySelector(".hero-text-container");
            
            // Apply bounce force
            const force = 0.5; // Strength of the bounce
            const direction = this.deltaX > 0 ? -1 : 1; // Determine direction of bounce
            
            // Add bounce force if dragged and released
            if (this.hitTest(ball, bounds)) {
                gsap.to(ball, {
                    x: direction * force * 900, // Bounce effect
                    duration: 0.5,
                    ease: "bounce.out",
                    onComplete: () => {
                        gsap.to(ball, {
                            x: 0,
                            duration: 0.2,
                            ease: "power1.out"
                        });
                    }
                });
            }
        },
        onClick: function () {
            const ball = document.querySelector(".drag-ball");
            
            console.log("clicked");
            
            // Apply floating effect on click
            gsap.to(ball, {
                y: 20, // Move upwards
                repeat: -1, // Infinite loop
                yoyo: true, // Bounce up and down
                duration: 0.5, 
                ease: "power1.inOut"
            });
        }
    });
    
    
}
matterjs();
