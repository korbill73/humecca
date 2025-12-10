const fs = require('fs');
const path = require('path');

const targetDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

// New IDC sidebar HTML with correct order (HUMECCA IDC → 서버호스팅 → 코로케이션)
const newIDCSidebar = `<li class="sidebar-header" style="font-weight:700; font-size:18px; margin-bottom:15px; padding-left:15px; color:#111827;">IDC</li>
            <li><a href="sub_idc_intro.html"><i class="fas fa-building"></i> HUMECCA IDC</a></li>
            <li><a href="sub_hosting.html"><i class="fas fa-server"></i> 서버호스팅</a></li>
            <li><a href="sub_colocation.html"><i class="fas fa-network-wired"></i> 코로케이션</a></li>`;

// Files to update
const files = ['sub_hosting.html', 'sub_colocation.html'];

files.forEach(file => {
    const filePath = path.join(targetDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Pattern to find the old sidebar menu content
        // Look for the sidebar-menu ul content between <ul class="sidebar-menu"> and </ul>
        const sidebarRegex = /<ul class="sidebar-menu">\s*([\s\S]*?)<\/ul>/;

        const match = content.match(sidebarRegex);
        if (match) {
            // Determine which link should be active based on file name
            let activeSidebar = newIDCSidebar;
            if (file === 'sub_hosting.html') {
                activeSidebar = activeSidebar.replace(
                    '<a href="sub_hosting.html">',
                    '<a href="sub_hosting.html" class="active">'
                );
            } else if (file === 'sub_colocation.html') {
                activeSidebar = activeSidebar.replace(
                    '<a href="sub_colocation.html">',
                    '<a href="sub_colocation.html" class="active">'
                );
            }

            const newContent = content.replace(
                sidebarRegex,
                `<ul class="sidebar-menu">\n                ${activeSidebar}\n            </ul>`
            );

            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated sidebar in: ${file}`);
        }
    }
});

console.log('IDC sidebar order updated successfully.');
