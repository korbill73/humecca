// Update all cloud pages with corrected sidebar menu (including 서비스 개요)
// and update header dropdown menu
const fs = require('fs');
const path = require('path');

// List of all cloud pages to update
const cloudPages = [
    'sub_cloud_intro.html',
    'sub_cloud_server.html',
    'sub_cloud_db.html',
    'sub_cloud_storage.html',
    'sub_cloud_network.html',
    'sub_cloud_management.html',
    'sub_cloud_monitoring.html',
    'sub_cloud_managed.html',
    'sub_cloud_vdi.html',
    'sub_cloud_private.html',
    'sub_cloud_limits.html'
];

// Map page to active key for sidebar
const pageActiveMap = {
    'sub_cloud_intro.html': 'INTRO',
    'sub_cloud_server.html': 'SERVER',
    'sub_cloud_db.html': 'DB',
    'sub_cloud_storage.html': 'STORAGE',
    'sub_security.html': 'SECURITY',
    'sub_cloud_network.html': 'NETWORK',
    'sub_cloud_management.html': 'MANAGEMENT',
    'sub_cloud_vdi.html': 'VDI',
    'sub_cloud_private.html': 'PRIVATE',
    'sub_cloud_limits.html': 'LIMITS',
    'sub_cloud_monitoring.html': 'MONITORING',
    'sub_cloud_managed.html': 'MANAGED'
};

function generateSidebar(activePage) {
    const activeKey = pageActiveMap[activePage] || 'SERVER';

    return `<ul class="sidebar-menu">
                <li><a href="sub_cloud_intro.html"${activeKey === 'INTRO' ? ' class="active"' : ''}><i class="fas fa-info-circle"></i> 서비스 개요</a></li>
                <li><a href="sub_cloud_server.html"${activeKey === 'SERVER' ? ' class="active"' : ''}><i class="fas fa-server"></i> Server</a></li>
                <li><a href="sub_cloud_db.html"${activeKey === 'DB' ? ' class="active"' : ''}><i class="fas fa-database"></i> 데이터베이스</a></li>
                <li><a href="sub_cloud_storage.html"${activeKey === 'STORAGE' ? ' class="active"' : ''}><i class="fas fa-hdd"></i> 스토리지/CDN</a></li>
                <li><a href="sub_security.html"${activeKey === 'SECURITY' ? ' class="active"' : ''}><i class="fas fa-shield-alt"></i> 보안</a></li>
                <li><a href="sub_cloud_network.html"${activeKey === 'NETWORK' ? ' class="active"' : ''}><i class="fas fa-network-wired"></i> 네트워크</a></li>
                <li><a href="sub_cloud_management.html"${activeKey === 'MANAGEMENT' ? ' class="active"' : ''}><i class="fas fa-tasks"></i> 매니지먼트</a></li>
                <li><a href="sub_cloud_vdi.html"${activeKey === 'VDI' ? ' class="active"' : ''}><i class="fas fa-desktop"></i> VDI</a></li>
                <li><a href="sub_cloud_private.html"${activeKey === 'PRIVATE' ? ' class="active"' : ''}><i class="fas fa-lock"></i> Private Cloud</a></li>
                <li><a href="sub_cloud_limits.html"${activeKey === 'LIMITS' ? ' class="active"' : ''}><i class="fas fa-info-circle"></i> 서비스별 제한사항</a></li>
            </ul>`;
}

// New header dropdown menu with VDI, Private Cloud, etc.
const newHeaderDropdown = `<div class="dropdown-menu mega-menu">
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
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-shield-alt"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">보안</span></div>
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

                            <p class="mega-section-title" style="margin-top: 12px; border-top: 1px solid #eee; padding-top: 12px;">매니지드 서비스</p>
                            <div class="mega-grid">
                                <a href="sub_cloud_monitoring.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-chart-line"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">디딤모니터링</span></div>
                                </a>
                                <a href="sub_cloud_managed.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-cogs"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">디딤매니지드</span></div>
                                </a>
                            </div>

                            <div style="margin-top: 12px; border-top: 1px solid #eee; padding-top: 12px;">
                                <a href="sub_cloud_limits.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-info-circle"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">서비스별 제한사항</span></div>
                                </a>
                            </div>

                            <div class="mega-cta">
                                <a href="https://login.humecca.co.kr" target="_blank">
                                    <i class="fas fa-cloud"></i> 서비스 바로 가기 <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>`;

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

cloudPages.forEach(pageName => {
    const filePath = path.join(basePath, pageName);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Generate sidebar with correct active class
        const sidebarHtml = generateSidebar(pageName);

        // Replace sidebar menu
        const sidebarPattern = /<ul class="sidebar-menu">[\s\S]*?<\/ul>/g;
        content = content.replace(sidebarPattern, sidebarHtml);

        // Replace header dropdown menu (mega-menu for cloud)
        const megaMenuPattern = /<div class="dropdown-menu mega-menu">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/li>/g;
        const closingTags = `</li>`;
        content = content.replace(megaMenuPattern, newHeaderDropdown + '\n                    ' + closingTags);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${pageName}`);
    } catch (err) {
        console.error(`Error updating ${pageName}: ${err.message}`);
    }
});

console.log('Done!');
