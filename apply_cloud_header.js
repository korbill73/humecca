const fs = require('fs');
const path = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

const targetFiles = [
    'sub_security.html',
    'sub_hosting.html',
    'sub_colocation.html',
    'sub_vpn.html',
    'sub_support.html',
    'sub_web_custom.html' // If exists
];

const cloudHeaderTemplate = (title, desc) => `
    <!-- Universal Cloud Style Header -->
    <section class="sub-header" style="background: #111827; padding: 80px 0 60px; color: white;">
        <div class="container">
            <h1 class="page-title" style="font-size: 36px; font-weight: 800; margin-bottom: 16px; color: white;">${title}</h1>
            <p class="page-desc" style="font-size: 18px; color: #9ca3af;">${desc}</p>
        </div>
    </section>
`;

targetFiles.forEach(file => {
    const filePath = path + file;
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let title = '';
        let desc = '';
        let updated = false;

        // 1. sub_security.html (Specific Case: cloud-intro-header)
        if (file === 'sub_security.html') {
            title = 'Security';
            desc = '기업의 소중한 자산을 지키는 최적의 보안 솔루션';
            const regex = /<div class="cloud-intro-header"[\s\S]*?<\/div>/;
            if (regex.test(content)) {
                content = content.replace(regex, cloudHeaderTemplate(title, desc));
                updated = true;
            }
        }

        // 2. Others - Try to find "Linear Gradient" header section
        else {
            const headerRegex = /<section[^>]*background:\s*linear-gradient[^>]*>[\s\S]*?<\/section>/i;
            const headerMatch = content.match(headerRegex);

            if (headerMatch) {
                const oldHeader = headerMatch[0];
                const titleMatch = oldHeader.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
                const descMatch = oldHeader.match(/<p[^>]*>([\s\S]*?)<\/p>/i);

                if (titleMatch) title = titleMatch[1].trim();
                else title = 'Service'; // Fallback

                if (descMatch) desc = descMatch[1].trim();
                else desc = ''; // Fallback

                content = content.replace(headerRegex, cloudHeaderTemplate(title, desc));
                updated = true;
            } else {
                // Check for "sub-header" that might already be styled differently (e.g. solid color)
                // But request says "change to Cloud style", so we enforce #111827
            }
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated header style in ${file}`);
        } else {
            console.log(`No update needed or header not found in ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
});
