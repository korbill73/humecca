const fs = require('fs');
const path = require('path');

const targetDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

// New IDC dropdown menu HTML
const newIDCMenu = `<li class="nav-item">
                        <a href="#" class="nav-link">IDC <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu" style="min-width:320px;">
                            <a href="sub_idc_intro.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-building"></i></div>
                                <div class="dropdown-text">
                                    <span class="dropdown-title">HUMECCA IDC</span>
                                    <span class="dropdown-desc">Tier 3+ 인증 IDC 센터, 엄격한 보안 및 물리적 안정성</span>
                                </div>
                            </a>
                            <a href="sub_hosting.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                                <div class="dropdown-text">
                                    <span class="dropdown-title">서버호스팅</span>
                                    <span class="dropdown-desc">KT 강남 IDC에서 운영되는 고성능 전용 서버</span>
                                </div>
                            </a>
                            <a href="sub_colocation.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-network-wired"></i></div>
                                <div class="dropdown-text">
                                    <span class="dropdown-title">코로케이션</span>
                                    <span class="dropdown-desc">Tier 3+ 데이터센터에서 안전한 서버 입주</span>
                                </div>
                            </a>
                        </div>
                    </li>`;

// Target files with old 260px width
const targetFiles = [
    'sub_cloud_vdi.html',
    'sub_cloud_storage.html',
    'sub_cloud_server.html',
    'sub_cloud_private.html',
    'sub_cloud_network.html',
    'sub_cloud_monitoring.html',
    'sub_cloud_management.html',
    'sub_cloud_managed.html',
    'sub_cloud_limits.html',
    'sub_cloud_db.html'
];

let updatedCount = 0;

targetFiles.forEach(file => {
    const filePath = path.join(targetDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Simple string replacement approach - find the old IDC block
    // Old pattern distinguisher: min-width:260px in IDC menu
    const oldPattern = /<li class="nav-item">\s*<a href="#" class="nav-link">IDC <i class="fas fa-chevron-down"><\/i><\/a>\s*<div class="dropdown-menu" style="min-width:260px;">[\s\S]*?<\/div>\s*<\/li>/g;

    if (oldPattern.test(content)) {
        oldPattern.lastIndex = 0;
        content = content.replace(oldPattern, newIDCMenu);
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Updated: ${file}`);
    }
});

console.log(`\nTotal: ${updatedCount} files updated`);
