/**
 * HUMECCA Premium UI
 * - Hero Parallax
 * - Scroll Storytelling (Sharehouse vs Luxury House)
 */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Parallax
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            // Move background slightly opposite to mouse
            heroSection.style.backgroundPosition = `calc(50% + ${-x}px) calc(50% + ${-y}px)`;
        });
    }

    // 2. Storytelling Animation
    const storyTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".story-section",
            start: "top top",
            end: "+=3000", // Long scroll duration
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    // Scene 1: Chaos (Fade out)
    storyTimeline
        .to(".chaos-scene", { scale: 0.8, opacity: 0, duration: 2 })

        // Scene 2: Luxury (Rise up)
        .fromTo(".luxury-scene",
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 3 }, "-=1"
        )

        // Scene 3: Shield Activation & Glow
        .to(".luxury-img", {
            boxShadow: "0 0 50px rgba(56, 189, 248, 0.6)",
            borderColor: "#38bdf8",
            borderWidth: "2px",
            borderStyle: "solid",
            borderRadius: "50%", // Shield effect illusion on image if circular, or just glow
            duration: 2
        })
        .to(".shield-effect", { opacity: 1, scale: 1.2, duration: 2 }, "<");

});
