const fs = require('fs');
const path = require('path');

const targetDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

// New IDC dropdown menu HTML with descriptions
const newIDCMenu = `<!-- 2. IDC (Dropdown) -->
                    <li class="nav-item">
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

// Pattern to find the old IDC menu block
// It starts with <!-- 2. IDC and ends before <!-- 3. VPN
const idcMenuRegex = /<!-- 2\. IDC \(Dropdown\) -->[\s\S]*?<\/li>\s*(?=\s*<!-- 3\. VPN -->)/g;

// Get all HTML files
const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(targetDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (idcMenuRegex.test(content)) {
        // Reset regex lastIndex
        idcMenuRegex.lastIndex = 0;

        content = content.replace(idcMenuRegex, newIDCMenu + '\n\n                    ');
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Updated IDC menu in: ${file}`);
    }
});

console.log(`\nTotal files updated: ${updatedCount}`);
