/**
 * HUMECCA Website Script
 * Optimized for performance and stability
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("HUMECCA Scripts Loaded");

    // ===================================
    // Mobile Menu Toggle
    // ===================================


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

        // Event Listeners: Arrows
        const prevBtn = document.querySelector('.hero-arrow.prev');
        const nextBtn = document.querySelector('.hero-arrow.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stopSlideTimer();
                showSlide(currentSlide - 1);
                startSlideTimer();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                stopSlideTimer();
                nextSlide();
                startSlideTimer();
            });
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
    // ===================================
    // Customer Logos Grid (Supabase Integration)
    // ===================================
    const logoGrid = document.getElementById('customer-logos-grid');

    async function loadCustomerLogos() {
        if (!logoGrid) return;

        // Wait for Supabase to be available
        if (typeof supabase === 'undefined' && window.sb) {
            window.supabase = window.sb; // Fallback
        }

        if (typeof supabase === 'undefined') {
            console.warn('⚠️ Supabase client not found. Skipping customer logo fetch.');
            return;
        }

        try {
            console.log('🔄 Fetching customer logos from DB...');
            const { data, error } = await supabase
                .from('customers')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(15);

            if (error) throw error;

            if (data && data.length > 0) {
                logoGrid.innerHTML = ''; // Clear existing content

                data.forEach(customer => {
                    const logoCard = document.createElement('div');
                    logoCard.className = 'logo-card';
                    // Inline styles removed to rely on styles.css for premium hover effects


                    // Check for logo_url or logo_path
                    const logoUrl = customer.logo_url || customer.logo_path || customer.logo;

                    if (logoUrl) {
                        const img = document.createElement('img');
                        img.src = logoUrl;
                        img.alt = customer.name;
                        img.style.maxHeight = '40px';
                        img.style.maxWidth = '80%';
                        img.style.objectFit = 'contain';

                        // Error fallback to text
                        img.onerror = function () {
                            this.style.display = 'none';
                            const text = document.createElement('span');
                            text.textContent = customer.name;
                            text.style.cssText = 'color: #64748b; font-weight: 600; font-size: 14px; text-align: center; padding: 0 10px; word-break: keep-all;';
                            logoCard.appendChild(text);
                        };

                        logoCard.appendChild(img);
                    } else {
                        const text = document.createElement('span');
                        text.textContent = customer.name;
                        text.style.cssText = `
                            color: #64748b;
                            font-weight: 600;
                            font-size: 14px;
                            text-align: center;
                            padding: 0 10px;
                            word-break: keep-all;
                        `;
                        logoCard.appendChild(text);
                    }
                    logoGrid.appendChild(logoCard);
                });
                console.log(`✅ Loaded ${data.length} customers from DB.`);
            } else {
                console.log('ℹ️ No customers found in DB.');
                logoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">등록된 고객사가 없습니다.</p>';
            }

        } catch (err) {
            console.error('❌ Failed to fetch customers:', err);
            // Optional: fallback to hardcoded list if DB fails? 
            // For now, just log error as requested.
        }
    }

    // specific call
    loadCustomerLogos();
});

// ===================================
// Console Signature
// ===================================
console.log('%c HUMECCA ', 'background: #1a237e; color: white; padding: 4px 8px; border-radius: 4px;');
