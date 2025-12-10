// Update all cloud pages with new sidebar menu
const fs = require('fs');
const path = require('path');

// List of cloud pages to update
const cloudPages = [
    'sub_cloud_intro.html',
    'sub_cloud_server.html',
    'sub_cloud_db.html',
    'sub_cloud_storage.html',
    'sub_cloud_network.html',
    'sub_cloud_management.html',
    'sub_cloud_monitoring.html',
    'sub_cloud_managed.html'
];

// New sidebar menu HTML (without active class - will be added per page)
const newSidebarMenu = `<ul class="sidebar-menu">
                <li><a href="sub_cloud_server.html" {SERVER_ACTIVE}><i class="fas fa-server"></i> Server</a></li>
                <li><a href="sub_cloud_db.html" {DB_ACTIVE}><i class="fas fa-database"></i> 데이터베이스</a></li>
                <li><a href="sub_cloud_storage.html" {STORAGE_ACTIVE}><i class="fas fa-hdd"></i> 스토리지/CDN</a></li>
                <li><a href="sub_security.html" {SECURITY_ACTIVE}><i class="fas fa-shield-alt"></i> 보안</a></li>
                <li><a href="sub_cloud_network.html" {NETWORK_ACTIVE}><i class="fas fa-network-wired"></i> 네트워크</a></li>
                <li><a href="sub_cloud_management.html" {MANAGEMENT_ACTIVE}><i class="fas fa-tasks"></i> 매니지먼트</a></li>
                <li><a href="sub_cloud_vdi.html" {VDI_ACTIVE}><i class="fas fa-desktop"></i> VDI</a></li>
                <li><a href="sub_cloud_private.html" {PRIVATE_ACTIVE}><i class="fas fa-lock"></i> Private Cloud</a></li>
                <li><a href="sub_cloud_limits.html" {LIMITS_ACTIVE}><i class="fas fa-info-circle"></i> 서비스별 제한사항</a></li>
            </ul>`;

// Map page to active placeholder
const pageActiveMap = {
    'sub_cloud_server.html': 'SERVER_ACTIVE',
    'sub_cloud_db.html': 'DB_ACTIVE',
    'sub_cloud_storage.html': 'STORAGE_ACTIVE',
    'sub_security.html': 'SECURITY_ACTIVE',
    'sub_cloud_network.html': 'NETWORK_ACTIVE',
    'sub_cloud_management.html': 'MANAGEMENT_ACTIVE',
    'sub_cloud_vdi.html': 'VDI_ACTIVE',
    'sub_cloud_private.html': 'PRIVATE_ACTIVE',
    'sub_cloud_limits.html': 'LIMITS_ACTIVE',
    'sub_cloud_monitoring.html': 'SERVER_ACTIVE', // monitoring doesn't have its own menu item
    'sub_cloud_managed.html': 'SERVER_ACTIVE', // managed doesn't have its own menu item
    'sub_cloud_intro.html': 'SERVER_ACTIVE' // intro doesn't have its own menu item
};

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

cloudPages.forEach(pageName => {
    const filePath = path.join(basePath, pageName);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Generate sidebar with correct active class
        let sidebarHtml = newSidebarMenu;
        const activeKey = pageActiveMap[pageName];

        // Replace all placeholders
        sidebarHtml = sidebarHtml.replace('{SERVER_ACTIVE}', activeKey === 'SERVER_ACTIVE' ? 'class="active"' : '');
        sidebarHtml = sidebarHtml.replace('{DB_ACTIVE}', activeKey === 'DB_ACTIVE' ? 'class="active"' : '');
        sidebarHtml = sidebarHtml.replace('{STORAGE_ACTIVE}', activeKey === 'STORAGE_ACTIVE' ? 'class="active"' : '');
        sidebarHtml = sidebarHtml.replace('{SECURITY_ACTIVE}', activeKey === 'SECURITY_ACTIVE' ? 'class="active"' : '');
        sidebarHtml = sidebarHtml.replace('{NETWORK_ACTIVE}', activeKey === 'NETWORK_ACTIVE' ? 'class="active"' : '');
        sidebarHtml = sidebarHtml.replace('{MANAGEMENT_ACTIVE}', activeKey === 'MANAGEMENT_ACTIVE' ? 'class="active"' : '');
        sidebarHtml = sidebarHtml.replace('{VDI_ACTIVE}', activeKey === 'VDI_ACTIVE' ? 'class="active"' : '');
        sidebarHtml = sidebarHtml.replace('{PRIVATE_ACTIVE}', activeKey === 'PRIVATE_ACTIVE' ? 'class="active"' : '');
        sidebarHtml = sidebarHtml.replace('{LIMITS_ACTIVE}', activeKey === 'LIMITS_ACTIVE' ? 'class="active"' : '');

        // Find and replace sidebar menu - handle different formats
        // Pattern 1: Simple ul.sidebar-menu
        const pattern1 = /<ul class="sidebar-menu">[\s\S]*?<\/ul>/g;
        // Pattern 2: Multiple sidebar-section divs
        const pattern2 = /<aside class="cloud-sidebar">[\s\S]*?<\/aside>/g;

        if (content.includes('sidebar-section')) {
            // Replace entire aside content for pages with sidebar-section
            const newAside = `<aside class="cloud-sidebar">
            ${sidebarHtml}
        </aside>`;
            content = content.replace(pattern2, newAside);
        } else {
            // Replace just the ul for simpler pages
            content = content.replace(pattern1, sidebarHtml);
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${pageName}`);
    } catch (err) {
        console.error(`Error updating ${pageName}: ${err.message}`);
    }
});

console.log('Done!');
