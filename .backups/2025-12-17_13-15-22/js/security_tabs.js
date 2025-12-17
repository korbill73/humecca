/**
 * Security Page Tab Switching Logic
 * Based on cloud_tabs.js pattern
 */

function switchSecurityTab(tabId, el) {
    if (!tabId) return;
    console.log('[SecurityTabs] Switching to:', tabId);

    // 1. Sidebar Management
    // Find the link if 'el' is not provided (e.g. called from hash param)
    if (!el) {
        // Try to find the link that calls this function with the given tabId
        el = document.querySelector(`.sidebar-menu a[onclick*="'${tabId}'"]`) ||
            document.querySelector(`.sidebar-menu a[onclick*='"${tabId}"']`);
    }

    // Update Sidebar Active State
    if (el) {
        const lis = document.querySelectorAll('.sidebar-menu li');
        lis.forEach(li => li.classList.remove('active'));

        const parentLi = el.closest('li');
        if (parentLi) parentLi.classList.add('active');
    }

    // 2. Content Management
    const tabs = document.querySelectorAll('.security-content');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Force hide
        tab.classList.remove('active');
    });

    // Look for ID with "tab-" prefix
    const target = document.getElementById(`tab-${tabId}`) || document.getElementById(tabId);

    if (target) {
        target.style.display = 'block'; // Show target
        // Slight delay
        setTimeout(() => {
            target.classList.add('active');
        }, 10);

        // Explicitly scroll to top so User sees the Hero section
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL hash without jumping
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash !== tabId) {
            if (history.pushState) {
                history.pushState(null, null, '#' + tabId);
            } else {
                window.location.hash = tabId;
            }
        }
    } else {
        console.warn('[SecurityTabs] Target tab not found:', tabId);
    }
}

// Global exposure
window.switchSecurityTab = switchSecurityTab;

// Handle Hash Changes (for Popup Menu navigation)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        switchSecurityTab(hash);
    }
});

// Auto-run on load
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        switchSecurityTab(hash);
    } else {
        // Default: WAF
        switchSecurityTab('waf');
    }
});
