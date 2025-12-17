const fs = require('fs');
const path = require('path');
const rootDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

// 1. Updated Menu Interaction Script (Fixes the "menu doesn't reappear" bug)
const newScript = `
<script>
    // Improved Menu Interaction
    document.addEventListener('DOMContentLoaded', () => {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const menu = item.querySelector('.dropdown-menu');
            if(!menu) return;

            // When link inside menu is clicked, hide menu immediately
            const links = menu.querySelectorAll('a.dropdown-item');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    menu.style.display = 'none'; // Force hide to prevent ghosting
                });
            });

            // CRITICAL FIX: When mouse leaves the parent li, reset the inline style 
            // This ensures that next time the user hovers, CSS :hover works again.
            item.addEventListener('mouseleave', () => {
                menu.style.display = ''; 
                menu.style.opacity = '';
                menu.style.visibility = '';
            });
            
             // Safety: Ensure it's clean (visible) when mouse enters
            item.addEventListener('mouseenter', () => {
                menu.style.display = ''; 
            });
        });
    });
</script>
`;

// 2. Security Mega Menu HTML (Matches Cloud Nav style)
const securityMenuHtml = `
                    <li class="nav-item">
                        <a href="sub_security.html" class="nav-link">보안 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu mega-menu" style="min-width: 500px;">
                            <p class="mega-section-title">Network Security</p>
                            <div class="mega-grid">
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-shield-alt"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">WAF (웹방화벽)</span></div>
                                </a>
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-plus-square"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">WAF Pro</span></div>
                                </a>
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-filter"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">클린존</span></div>
                                </a>
                            </div>

                            <p class="mega-section-title" style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px;">System & Data Security</p>
                            <div class="mega-grid">
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-certificate"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">Private CA</span></div>
                                </a>
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-lock"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">Certificate Manager</span></div>
                                </a>
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-laptop-medical"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">V3 Net Server</span></div>
                                </a>
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">DBSAFER</span></div>
                                </a>
                            </div>
                        </div>
                    </li>`;

const allFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // A. Replace Old Interaction Script with the Fixed One
    // We look for the previous script block and replace it.
    // If exact match fails, we try to find the location and insert.

    const oldScriptRegex = /<script>\s*\/\/\s*Menu Hide on Click Script[\s\S]*?<\/script>/;
    if (oldScriptRegex.test(content)) {
        content = content.replace(oldScriptRegex, newScript);
        updated = true;
    } else if (content.includes('Improved Menu Interaction')) {
        // Already updated? Skip or overwrite? Let's overwrite to be safe if I change logic.
        const improvedRegex = /<script>\s*\/\/\s*Improved Menu Interaction[\s\S]*?<\/script>/;
        content = content.replace(improvedRegex, newScript);
        updated = true;
    } else {
        // If not found at all, append before body close
        if (content.includes('</body>')) {
            content = content.replace('</body>', newScript + '</body>');
            updated = true;
        }
    }

    // B. Replace Security Menu Item with Mega Dropdown
    // Match: <li class="nav-item"><a href="sub_security.html" class="nav-link">보안</a></li> (with variable spacing)
    const securityRegex = /<li class="nav-item">\s*<a href="sub_security\.html" class="nav-link">보안<\/a>\s*<\/li>/;

    if (securityRegex.test(content)) {
        content = content.replace(securityRegex, securityMenuHtml);
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated interaction and security menu in ${file}`);
    }
});
