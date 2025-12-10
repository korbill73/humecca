const fs = require('fs');
const path = require('path');

const targetDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

// New IDC dropdown menu HTML with descriptions
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

// Get all HTML files
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(targetDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // More robust pattern: Match from IDC nav-item opening to its closing </li>
    // Pattern: <li class="nav-item">..IDC..</li> before VPN
    const idcMenuRegex = /<li class="nav-item">\s*<a href="#" class="nav-link">IDC[\s\S]*?<\/div>\s*<\/li>\s*(?=<li class="nav-item"><a href="sub_vpn)/g;

    if (idcMenuRegex.test(content)) {
        // Reset regex lastIndex
        idcMenuRegex.lastIndex = 0;

        content = content.replace(idcMenuRegex, newIDCMenu + '\n                    ');
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Updated IDC menu in: ${file}`);
    }
});

console.log(`\nTotal files updated: ${updatedCount}`);
