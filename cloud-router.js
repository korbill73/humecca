/**
 * Cloud Pages SPA Router - Instant Local Transition
 * optimized for "No Flicker" user requirement
 */

(function () {
    // 1. Common Tab Functionality (Global)
    window.showTab = function (tabId) {
        const container = document.querySelector('.cloud-content');
        if (!container) return;

        container.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        container.querySelectorAll('.engine-tab').forEach(el => el.classList.remove('active'));

        const targetContent = document.getElementById(tabId);
        if (targetContent) targetContent.classList.add('active');

        const btn = container.querySelector(`.engine-tab[onclick*="${tabId}"]`);
        if (btn) btn.classList.add('active');
    };

    // 2. Init Router
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRouter);
    } else {
        initRouter();
    }

    function initRouter() {
        document.body.addEventListener('click', handleLinkClick);
        window.addEventListener('popstate', handlePopState);

        if (!history.state) {
            const currentFile = location.pathname.split('/').pop().split('?')[0] || 'sub_cloud_intro.html';
            history.replaceState({ fileName: currentFile }, '', location.href);
        }
    }

    function handlePopState(e) {
        if (e.state && e.state.fileName) {
            loadPage(e.state.fileName, false);
            updateSidebarUI(e.state.fileName);
        }
    }

    function handleLinkClick(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        // Filter for cloud sub-pages only
        if (!href || !href.includes('sub_cloud_') || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;

        const fileName = href.split('/').pop().split('?')[0];

        // NOTE: Same page check removed to ensure click feedback works even if user clicks current page link.
        // This solves "Selection not working" issue if state desync occurs.

        if (window.CLOUD_CONTENTS && window.CLOUD_CONTENTS[fileName]) {
            e.preventDefault();
            updateSidebarUI(fileName);
            loadPage(fileName, true);
        }
        // If content missing, fallback to browser navigation
    }

    function updateSidebarUI(activeFileName) {
        const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
        sidebarLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // Check if link matches active filename
            // Handle cases where link might be './sub_cloud_intro.html' vs 'sub_cloud_intro.html'
            if (linkHref && linkHref.indexOf(activeFileName) !== -1) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function loadPage(fileName, pushState = true) {
        const contentHTML = window.CLOUD_CONTENTS[fileName];
        const heroHTML = window.CLOUD_CONTENTS[fileName + '_hero'];
        const pageTitle = window.CLOUD_CONTENTS[fileName + '_title'];

        if (!contentHTML) {
            window.location.href = fileName;
            return;
        }

        updateHeroText(heroHTML);

        const contentContainer = document.querySelector('.cloud-content');
        if (contentContainer) {
            contentContainer.innerHTML = contentHTML;
            window.scrollTo(0, 0);
            initTabs(contentContainer);
        }

        if (pageTitle) document.title = pageTitle;

        if (pushState) {
            history.pushState({ fileName: fileName }, '', fileName);
        }
    }

    function updateHeroText(heroHTML) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = heroHTML || '';

        const currentHero = document.querySelector('.cloud-hero');
        if (!currentHero) return;

        const newH1 = tempDiv.querySelector('h1');
        const curH1 = currentHero.querySelector('h1');
        if (newH1 && curH1) curH1.textContent = newH1.textContent;

        const newP = tempDiv.querySelector('p');
        const curP = currentHero.querySelector('p');
        if (newP && curP) curP.textContent = newP.textContent;

        const newBadge = tempDiv.querySelector('.badge');
        const curBadge = currentHero.querySelector('.badge');
        if (newBadge && curBadge) curBadge.textContent = newBadge.textContent;
    }

    function initTabs(container) {
        const tabs = container.querySelectorAll('.engine-tab');
        if (tabs.length > 0) {
            const activeTab = container.querySelector('.engine-tab.active');
            if (!activeTab) {
                tabs[0].classList.add('active');
                const firstContent = container.querySelector('.tab-content');
                if (firstContent) firstContent.classList.add('active');
            }
        }
    }
})();
