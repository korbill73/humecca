const fs = require('fs');
const path = require('path');
const rootDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

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

// Strategy: Find the entire block from "<!-- 1. Cloud (Mega Menu) -->" to "<!-- 2. IDC (Dropdown) -->"
// This relies on the comments present in the file.
const allFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // We attempt to identify the block using the comments
    // Regex: Match <!-- 1. Cloud ... --> up to <!-- 2. IDC ... -->
    const blockRegex = /<!-- 1\. Cloud \(Mega Menu\) -->[\s\S]*?<!-- 2\. IDC \(Dropdown\) -->/i;

    if (blockRegex.test(content)) {
        const replacement = `<!-- 1. Cloud (Mega Menu) -->
${cloudMenuHtml}
                    <!-- 2. IDC (Dropdown) -->`;
        content = content.replace(blockRegex, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Restored Cloud Mega Menu in ${file}`);
    } else {
        console.log(`Target block not found in ${file}. Checking manual structure...`);
        // Fallback: If comments are missing, try to locate by unique anchor href
        // Find <li class="nav-item"> containing sub_cloud_intro.html and replace until next <li class="nav-item"> containing IDC

        // This regex looks for the LI wrapping the Cloud link, and stops before the LI wrapping the IDC link
        const fallbackRegex = /(<li class="nav-item">\s*<a href="sub_cloud_intro\.html"[\s\S]*?)(<li class="nav-item">\s*<a href="#" class="nav-link">IDC)/i;

        if (fallbackRegex.test(content)) {
            content = content.replace(fallbackRegex, (match, cloudPart, idcPart) => {
                return cloudMenuHtml + '\n                    ' + idcPart;
            });
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Restored Cloud Mega Menu (Fallback) in ${file}`);
        } else {
            console.log(`Could not auto-restore menu in ${file}`);
        }
    }
});
