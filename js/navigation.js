
document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const CONFIG = {
        contentSelector: '#main-content',
        linkSelector: 'a[href^="/"], a[href^="."], a[href^="sub_"]', // Internal links
        excludeSelectors: ['[target="_blank"]', '[href^="#"]', '[onclick]'], // Exclude external/anchor/js links
        transitionDuration: 300
    };

    // Initialize Navigation
    initNavigation();

    // Handle Browser Back/Forward
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.url) {
            loadContent(event.state.url, false);
        } else {
            // Fallback for initial state or if state is missing
            window.location.reload();
        }
    });

    function initNavigation() {
        document.body.addEventListener('click', (e) => {
            const link = e.target.closest('a');

            // Validation
            if (!link) return;
            if (isExternal(link)) return;
            if (CONFIG.excludeSelectors.some(selector => link.matches(selector))) return;
            if (link.href === window.location.href) {
                e.preventDefault();
                return;
            }

            // Proceed with SPA navigation
            e.preventDefault();
            const url = link.href;

            // Add initial history state if not present
            if (!history.state) {
                history.replaceState({ url: window.location.href }, document.title, window.location.href);
            }

            loadContent(url, true);
        });
    }

    // NProgress-like lightweight implementation
    const ProgressBar = {
        start: () => {
            let bar = document.getElementById('nprogress-bar');
            if (!bar) {
                bar = document.createElement('div');
                bar.id = 'nprogress-bar';
                document.body.appendChild(bar);
            }
            bar.style.width = '0%';
            bar.style.opacity = '1';

            // Simulate progress
            setTimeout(() => { if (bar.style.opacity === '1') bar.style.width = '30%'; }, 50);
            setTimeout(() => { if (bar.style.opacity === '1') bar.style.width = '70%'; }, 500);
        },
        done: () => {
            const bar = document.getElementById('nprogress-bar');
            if (bar) {
                bar.style.width = '100%';
                setTimeout(() => {
                    bar.style.opacity = '0';
                    setTimeout(() => { bar.style.width = '0%'; }, 200);
                }, 200);
            }
        }
    };

    async function loadContent(url, pushToHistory) {
        const mainContent = document.querySelector(CONFIG.contentSelector);
        if (!mainContent) {
            console.error('Main content wrapper not found!');
            window.location.href = url; // Fallback to full reload
            return;
        }

        try {
            // Start Progress Bar
            ProgressBar.start();

            // Start Transition (Fade Out)
            mainContent.style.opacity = '0.5';
            mainContent.style.transition = `opacity ${CONFIG.transitionDuration}ms ease`;

            // Fetch Content
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();

            // Parse HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector(CONFIG.contentSelector);

            if (!newContent) {
                throw new Error('New page does not contain #main-content wrapper');
            }

            // Update DOM (Fade In)
            setTimeout(() => {
                mainContent.innerHTML = newContent.innerHTML;
                document.title = doc.title;

                // Update History
                if (pushToHistory) {
                    history.pushState({ url: url }, doc.title, url);
                }

                // Scroll to top
                window.scrollTo(0, 0);

                // Update Active Menu
                updateActiveMenu(url);

                // Re-initialize Scripts
                reinitializeScripts();

                // Finish Transition
                mainContent.style.opacity = '1';

                // Ensure header placeholder stays correct height
                checkHeaderHeight();

                // Complete Progress Bar
                ProgressBar.done();

            }, CONFIG.transitionDuration / 2); // Wait halfway for smoothness

        } catch (error) {
            console.error('Navigation failed:', error);
            window.location.href = url; // Fallback
        }
    }

    function isExternal(link) {
        return link.hostname !== window.location.hostname || link.protocol !== window.location.protocol;
    }

    function updateActiveMenu(url) {
        // Simple implementation: remove 'active' from all, add to matching href
        document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
            link.classList.remove('active');
            if (link.href === url) {
                link.classList.add('active');
            }
        });
    }

    function checkHeaderHeight() {
        const placeholder = document.getElementById('header-placeholder');
        if (placeholder) {
            // Force re-evaluation if needed, but CSS media queries should handle this.
            // This is just a safety check logic if we were doing JS sizing.
        }
    }

    // Function to re-run necessary page scripts
    function reinitializeScripts() {
        // 1. Re-init Hero Slider if present
        if (document.querySelector('.hero-section') && window.initHeroSlider) {
            window.initHeroSlider();
        }

        // 2. Re-init Canvas if present
        if (document.getElementById('hero-canvas') && window.initHeroCanvas) {
            window.initHeroCanvas();
        }

        // 3. Re-init Customer Logos if present
        if (document.getElementById('customer-logos-grid') && window.loadCustomerLogos) {
            window.loadCustomerLogos();
        }

        // 4. Re-init AOS/Animations if used (example)
        // if (window.AOS) window.AOS.refresh();

        console.log('Scripts re-initialized');
    }
});
