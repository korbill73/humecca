/**
 * HUMECCA Website Script
 * Optimized for performance and stability
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("HUMECCA Scripts Loaded");

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // ===================================
    // Contact Form (Simple Alert)
    // ===================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('상담 신청이 접수되었습니다. 담당자가 확인 후 빠르게 연락드리겠습니다.');
            contactForm.reset();
        });
    }

    // ===================================
    // Hero Slider Logic (Robust)
    // ===================================
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');

    // Only run if slider exists
    if (slides.length > 0) {
        console.log(`Slider Initialized: ${slides.length} slides found.`);

        let currentSlide = 0;
        const slideInterval = 5000;
        let slideTimer;

        // Function to switch slides
        function showSlide(index) {
            // Index wrapping
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            currentSlide = index;

            // 1. Update Slides (Class-based transition)
            slides.forEach((slide, i) => {
                if (i === currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // 2. Update Dots (Style-based transition)
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    if (i === currentSlide) {
                        dot.classList.add('active');
                        // Force styles for visibility
                        dot.style.width = '40px';
                        dot.style.background = '#EF4444';
                        dot.style.opacity = '1';
                    } else {
                        dot.classList.remove('active');
                        // Reset styles
                        dot.style.width = '20px';
                        dot.style.background = 'rgba(255,255,255,0.2)';
                        dot.style.opacity = '1';
                        // Ensure background is reset specifically
                    }
                });
            }
        }

        // Next Slide Function
        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Timer Control
        function startSlideTimer() {
            if (slideTimer) clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, slideInterval);
        }

        function stopSlideTimer() {
            if (slideTimer) clearInterval(slideTimer);
        }

        // Event Listeners: Dot Clicks
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent jump
                    stopSlideTimer();
                    showSlide(index);
                    startSlideTimer();
                });
            });
        }

        // Event Listeners: Pause on Hover
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.addEventListener('mouseenter', stopSlideTimer);
            heroContent.addEventListener('mouseleave', startSlideTimer);
        }

        // Initialize (Show first slide explicitly to set dots)
        // Note: HTML usually has first slide active, but JS needs to sync dots.
        // We'll trust HTML 'active' state for LCP, but run showSlide(0) to ensure dots sync IF not set.
        // Actually, preventing restart of animation is better.
        // We'll just start timer. 
        // Sync dots for initial state:
        showSlide(0);
        startSlideTimer();
    }
});

// ===================================
// Console Signature
// ===================================
console.log('%c HUMECCA ', 'background: #1a237e; color: white; padding: 4px 8px; border-radius: 4px;');
