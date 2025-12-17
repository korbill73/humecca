/**
 * Cloud Page Tab Switching Logic
 * Restored & Fixed to handle ID prefixes and hash changes
 */

function switchCloudTab(tabId, el) {
    if (!tabId) return;
    console.log('[CloudTabs] Switching to:', tabId);

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
    const tabs = document.querySelectorAll('.cloud-tab');
    tabs.forEach(tab => {
        tab.style.display = 'none'; // Force hide
        tab.classList.remove('active');
    });

    // Look for ID with "tab-" prefix to avoid default browser scrolling behavior (URL hash vs Element ID)
    // Also fallback to raw tabId just in case
    const target = document.getElementById(`tab-${tabId}`) || document.getElementById(tabId);

    if (target) {
        target.style.display = 'block'; // Show target
        // Slight delay to allow display:block to apply before adding class (for CSS transitions if exist)
        setTimeout(() => {
            target.classList.add('active');
        }, 10);

        // Explicitly scroll to top so User sees the Hero section
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Avoid infinite loop if hash change triggered this
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash !== tabId) {
            if (history.pushState) {
                history.pushState(null, null, '#' + tabId);
            } else {
                // Fallback (might jump)
                window.location.hash = tabId;
            }
        }
    } else {
        console.warn('[CloudTabs] Target tab not found:', tabId);
        // Fallback: If 'intro' failed, try to show the first tab available?
        // No, that might be confusing.
    }
}

// Global exposure
window.switchCloudTab = switchCloudTab;

// Handle Hash Changes (for Popup Menu navigation)
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        switchCloudTab(hash);
    }
});

// Auto-run on load if hash is present, OR default to intro if missing
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        switchCloudTab(hash);
    } else {
        // Default to service intro if no hash provided
        switchCloudTab('intro');
    }
});
