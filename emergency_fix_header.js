const fs = require('fs');
const path = require('path');
const rootDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

// 1. Correct Cloud Mega Menu HTML (Clean, Valid Structure)
const cloudMenuHtml = `
                    <li class="nav-item">
                        <a href="sub_cloud_intro.html" class="nav-link">
                            클라우드 <i class="fas fa-chevron-down"></i>
                        </a>
                        <div class="dropdown-menu mega-menu">
                            <a href="sub_cloud_intro.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-cloud"></i></div>
                                <div class="dropdown-text">
                                    <span class="dropdown-title">클라우드 소개</span>
                                    <span class="dropdown-desc">KT Cloud 기반 유연한 인프라</span>
                                </div>
                            </a>
                            <p class="mega-section-title">KT Cloud 서비스</p>
                            <div class="mega-grid">
                                <a href="sub_cloud_server.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">Server</span></div>
                                </a>
                                <a href="sub_cloud_db.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">데이터베이스</span></div>
                                </a>
                                <a href="sub_cloud_storage.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-hdd"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">스토리지/CDN</span></div>
                                </a>
                                <a href="sub_cloud_network.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-network-wired"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">네트워크</span></div>
                                </a>
                                <a href="sub_cloud_management.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-tasks"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">매니지먼트</span></div>
                                </a>
                                <a href="sub_cloud_vdi.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-desktop"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">VDI</span></div>
                                </a>
                                <a href="sub_cloud_private.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-lock"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">Private Cloud</span></div>
                                </a>
                            </div>

                            <div style="margin-top: 12px; border-top: 1px solid #eee; padding-top: 12px;">
                                <a href="sub_cloud_limits.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-info-circle"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">서비스별 제한사항</span></div>
                                </a>
                            </div>

                            <!-- CTA Button -->
                            <div class="mega-cta">
                                <a href="https://login.humecca.co.kr" target="_blank">
                                    <i class="fas fa-cloud"></i> 서비스 바로 가기 <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </li>`;

// 2. Correct Security Mega Menu
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

// 3. Interaction Script
const interactionScript = `
<script>
    // Improved Menu Interaction (Restored)
    document.addEventListener('DOMContentLoaded', () => {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const menu = item.querySelector('.dropdown-menu');
            if(!menu) return;
            const links = menu.querySelectorAll('a.dropdown-item');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    menu.style.display = 'none'; 
                });
            });
            item.addEventListener('mouseleave', () => {
                menu.style.display = ''; 
                menu.style.opacity = '';
                menu.style.visibility = '';
            });
            item.addEventListener('mouseenter', () => {
                menu.style.display = ''; 
            });
        });
    });
</script>
`;

const allFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
    // Target main files
    if (file !== 'index.html' && !file.startsWith('sub_')) return;

    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // A. Fix Cloud Menu Block
    // Find block between "<!-- 1. Cloud (Mega Menu) -->" and "<!-- 2. IDC"
    // Using regex that captures minimal content between markers, even if broken
    const cloudBlockRegex = /<!-- 1\. Cloud \(Mega Menu\) -->[\s\S]*?<!-- 2\. IDC/;

    if (cloudBlockRegex.test(content)) {
        const replacement = `<!-- 1. Cloud (Mega Menu) -->
${cloudMenuHtml}
                    <!-- 2. IDC`;

        // Always replace to ensure consistency
        content = content.replace(cloudBlockRegex, replacement);
        updated = true;
    }

    // B. Fix Security Menu (if simple link found, upgrade it)
    const simpleSecurityRegex = /<li class="nav-item">\s*<a href="sub_security\.html" class="nav-link">보안<\/a>\s*<\/li>/;
    if (simpleSecurityRegex.test(content)) {
        content = content.replace(simpleSecurityRegex, securityMenuHtml);
        updated = true;
    }

    // C. Re-inject Interaction Script if missing
    if (!content.includes('Improved Menu Interaction')) {
        if (content.includes('</body>')) {
            content = content.replace('</body>', interactionScript + '</body>');
            updated = true;
        }
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Emergency fix applied to ${file}`);
    }
});
