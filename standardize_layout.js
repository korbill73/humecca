const fs = require('fs');
const path = require('path');

const rootDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

const targetGroups = {
    'IDC': {
        files: ['sub_hosting.html', 'sub_colocation.html'],
        sidebar: `
            <li class="sidebar-header" style="font-weight:700; font-size:18px; margin-bottom:15px; padding-left:15px; color:#111827;">IDC</li>
            <li><a href="sub_hosting.html" {{HOSTING_ACTIVE}}><i class="fas fa-server"></i> 서버호스팅</a></li>
            <li><a href="sub_colocation.html" {{COLO_ACTIVE}}><i class="fas fa-building"></i> 코로케이션</a></li>
            <li><a href="#"><i class="fas fa-info-circle"></i> IDC 소개</a></li>
        `
    },
    'VPN': {
        files: ['sub_vpn.html'],
        sidebar: `
            <li class="sidebar-header" style="font-weight:700; font-size:18px; margin-bottom:15px; padding-left:15px; color:#111827;">VPN</li>
            <li><a href="sub_vpn.html" class="active"><i class="fas fa-network-wired"></i> VPN 전용선</a></li>
        `
    },
    'Solution': {
        files: ['sub_web_custom.html'],
        sidebar: `
            <li class="sidebar-header" style="font-weight:700; font-size:18px; margin-bottom:15px; padding-left:15px; color:#111827;">기업솔루션</li>
            <li><a href="#"><i class="fab fa-microsoft"></i> MS 365</a></li>
            <li><a href="#"><i class="fas fa-comments"></i> NAVER WORKS</a></li>
            <li><a href="sub_web_custom.html" class="active"><i class="fas fa-laptop-code"></i> 홈페이지 제작</a></li>
        `
    },
    'Support': {
        files: ['sub_support.html'],
        sidebar: `
            <li class="sidebar-header" style="font-weight:700; font-size:18px; margin-bottom:15px; padding-left:15px; color:#111827;">고객센터</li>
            <li><a href="#"><i class="fas fa-bullhorn"></i> 공지사항</a></li>
            <li><a href="#"><i class="fas fa-question-circle"></i> 자주 묻는 질문</a></li>
            <li><a href="sub_support.html" class="active"><i class="fas fa-headset"></i> 1:1 문의</a></li>
        `
    }
};

const allFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Remove Security from Dropdown Menus (GNB)
    // Matches <a href="...security..." class="dropdown-item">...</a>
    const securityRegex = /<a[^>]*href="[^"]*security[^"]*"[^>]*class="dropdown-item"[^>]*>[\s\S]*?<\/a>/gi;
    if (securityRegex.test(content)) {
        content = content.replace(securityRegex, '');
        modified = true;
        console.log(`Removed GNB security dropdown from ${file}`);
    }

    // 2. Apply Sidebar Layout to specific sub pages
    let groupKey = null;
    for (const key in targetGroups) {
        if (targetGroups[key].files.includes(file)) {
            groupKey = key;
            break;
        }
    }

    if (groupKey) {
        // Only apply if not already converted
        if (!content.includes('class="cloud-layout"') && !content.includes('id="layout-fix"')) {
            const mainRegex = /(<main[^>]*>)([\s\S]*?)(<\/main>)/i;
            const match = content.match(mainRegex);

            if (match) {
                const mainTag = match[1];
                const mainBody = match[2];
                const closeMain = match[3];

                let sidebarHtml = targetGroups[groupKey].sidebar;

                if (groupKey === 'IDC') {
                    if (file === 'sub_hosting.html') {
                        sidebarHtml = sidebarHtml.replace('{{HOSTING_ACTIVE}}', 'class="active"').replace('{{COLO_ACTIVE}}', '');
                    } else {
                        sidebarHtml = sidebarHtml.replace('{{HOSTING_ACTIVE}}', '').replace('{{COLO_ACTIVE}}', 'class="active"');
                    }
                }

                const newLayout = `
    <!-- Layout Wrapper -->
    <div class="container" style="padding-top:60px; padding-bottom:100px;">
        <div class="cloud-layout" style="display:flex; gap:30px; align-items:flex-start;">
            
            <!-- Sidebar -->
            <aside class="cloud-sidebar" style="width:240px; flex-shrink:0;">
                <ul class="sidebar-menu">
                    ${sidebarHtml}
                </ul>
            </aside>

            <!-- Main Content -->
            <main class="cloud-content-area" style="flex:1; min-width:0;">
                ${mainBody}
            </main>
        </div>
    </div>
                `;

                content = content.replace(mainRegex, newLayout);

                // Add style fix for nested containers
                content = content.replace('</body>', `
<style id="layout-fix">
    .cloud-content-area .container {
        width: 100% !important;
        max-width: none !important;
        padding: 0 !important;
        margin: 0 !important;
    }
</style>
</body>`);

                modified = true;
                console.log(`Applied sidebar layout to ${file}`);
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
