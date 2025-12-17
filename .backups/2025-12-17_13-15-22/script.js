/**
 * HUMECCA Website Script
 * Optimized for performance and stability
 */

// Global Initialization Functions
window.initHeroSlider = function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');

    console.log("Checking for Hero Slider...");

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

            // 2. Update Dots
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    if (i === currentSlide) {
                        dot.classList.add('active');
                        dot.style.width = '40px';
                        dot.style.background = '#EF4444';
                        dot.style.opacity = '1';
                    } else {
                        dot.classList.remove('active');
                        dot.style.width = '20px';
                        dot.style.background = 'rgba(255,255,255,0.2)';
                        dot.style.opacity = '1';
                    }
                });
            }

            // 3. Update Counter
            const slideNumber = document.querySelector('.slide-number');
            if (slideNumber) {
                slideNumber.textContent = currentSlide + 1;
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
                // Remove old listeners to prevent duplicates (cloning element trick if needed, but simple add is risky if run multiple times without cleanup. 
                // For simplicity in this context, we assume clean DOM or idempotency via closures, but safer to re-clone or just add. 
                // Since we replace DOM, new elements don't have listeners. Perfect.)
                dot.onclick = (e) => {
                    e.preventDefault();
                    stopSlideTimer();
                    showSlide(index);
                    startSlideTimer();
                };
            });
        }

        // Event Listeners: Pause on Hover
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.onmouseenter = stopSlideTimer;
            heroContent.onmouseleave = startSlideTimer;
        }

        // Event Listeners: Arrows
        const prevBtn = document.querySelector('.hero-arrow.prev');
        const nextBtn = document.querySelector('.hero-arrow.next');

        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                stopSlideTimer();
                showSlide(currentSlide - 1);
                startSlideTimer();
            };
        }
        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                stopSlideTimer();
                nextSlide();
                startSlideTimer();
            };
        }

        // Initialize
        showSlide(0);
        startSlideTimer();
    }
};

window.loadCustomerLogos = async function () {
    const grid = document.getElementById('customer-logos-grid');
    if (!grid) return;

    try {
        console.log("Loading Customer Logos...");
        let customers = [];
        if (typeof supabase !== 'undefined') {
            const { data, error } = await supabase
                .from('customers')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && data) {
                customers = data;
            }
        }

        if (customers.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #9ca3af;">등록된 고객사가 없습니다.</p>';
            return;
        }

        grid.innerHTML = customers.map((customer, index) => `
            <div class="logo-card" style="
                background: rgba(255,255,255,0.95);
                backdrop-filter: blur(8px);
                padding: 20px 16px;
                border-radius: 12px;
                border: 1px solid rgba(226,232,240,0.8);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 90px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                cursor: pointer;
                position: relative;
                overflow: hidden;
                animation: fadeInUp 0.6s ease-out ${index * 0.08}s backwards;
            ">
                <div style="
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transform: translateX(-100%);
                    transition: transform 0.6s;
                    pointer-events: none;
                " class="shine-overlay"></div>
                <div style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center; 
                    min-height: 52px;
                    position: relative;
                    z-index: 1;
                ">
                    ${customer.logo_url ?
                `<img src="${customer.logo_url}" alt="${customer.name}" style="max-width: 100%; max-height: 52px; object-fit: contain;">` :
                `<span style="color: #475569; font-size: 14px; font-weight: 700; text-align: center;">${customer.name}</span>`
            }
                </div>
            </div>
        `).join('');

        // Add hover effects
        setTimeout(() => {
            const logoCards = document.querySelectorAll('.logo-card');
            logoCards.forEach(card => {
                card.onmouseenter = function () {
                    const shineOverlay = this.querySelector('.shine-overlay');
                    if (shineOverlay) shineOverlay.style.transform = 'translateX(100%)';
                    this.style.background = 'rgba(255,245,245,1)';
                    this.style.boxShadow = '0 12px 40px rgba(239,68,68,0.15)';
                    this.style.borderColor = 'rgba(239,68,68,0.3)';
                };
                card.onmouseleave = function () {
                    const shineOverlay = this.querySelector('.shine-overlay');
                    if (shineOverlay) shineOverlay.style.transform = 'translateX(-100%)';
                    this.style.background = 'rgba(255,255,255,0.95)';
                    this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                    this.style.borderColor = 'rgba(226,232,240,0.8)';
                };
            });
        }, 100);

    } catch (error) {
        console.error('Failed to load customer logos:', error);
    }
};


document.addEventListener('DOMContentLoaded', function () {
    console.log("HUMECCA Scripts Loaded");

    // Initialize Components
    window.initHeroSlider();
    window.loadCustomerLogos();

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('상담 신청이 접수되었습니다. 담당자가 확인 후 빠르게 연락드리겠습니다.');
            contactForm.reset();
        });
    }
});
