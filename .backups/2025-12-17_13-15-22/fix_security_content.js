const fs = require('fs');
const path = require('path');
const rootDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

// 1. Fix sub_security.html (Remove duplicate dark header)
const secFile = path.join(rootDir, 'sub_security.html');
if (fs.existsSync(secFile)) {
    let content = fs.readFileSync(secFile, 'utf8');

    // Remove the dark sub-header section that was duplicated
    // Pattern: <section class="sub-header" style="background: #111827; ..."> ... </section>
    const darkHeaderRegex = /<section class="sub-header" style="background: #111827;[\s\S]*?<\/section>/;

    if (darkHeaderRegex.test(content)) {
        content = content.replace(darkHeaderRegex, '');
        fs.writeFileSync(secFile, content, 'utf8');
        console.log('Removed duplicate dark header from sub_security.html');
    } else {
        console.log('No duplicate dark header found in sub_security.html');
    }
}

// 2. Fix GNB (Remove "Managed Service" section and items) in ALL HTML files
const allFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Pattern A: The Section Title "매니지드 서비스" + The Following Mega Grid
    // <p class="mega-section-title" ...>매니지드 서비스</p> ... <div class="mega-grid">...</div>
    const managedSectionRegex = /<p class="mega-section-title"[^>]*>\s*매니지드 서비스\s*<\/p>\s*<div class="mega-grid">[\s\S]*?<\/div>/gi;

    if (managedSectionRegex.test(content)) {
        content = content.replace(managedSectionRegex, '');
        updated = true;
    }

    // Pattern B: Checking for any leftover "디딤모니터링" or "디딤매니지드" links just in case
    const didimRegex = /<a[^>]*class="dropdown-item"[^>]*>[\s\S]*?<span[^>]*>디딤(모니터링|매니지드)<\/span>[\s\S]*?<\/a>/gi;
    if (didimRegex.test(content)) {
        content = content.replace(didimRegex, '');
        updated = true;
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Cleaned up Mega Menu in ${file}`);
    }
});
