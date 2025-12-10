const fs = require('fs');
const path = require('path');

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

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

cloudPages.forEach(pageName => {
    const filePath = path.join(basePath, pageName);
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Remove transitions from sidebar links
        // We look for the transition line we added recently OR any transition property
        // Replace with 'transition: none;'
        content = content.replace(
            /transition: color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;/g,
            'transition: none;'
        );
        // Fallback for original style if not updated yet
        content = content.replace(/transition:\s*all\s*0\.2s\s*ease;/g, 'transition: none;');

        // 2. Remove box-shadow from active state to prevent "growing" effect perception
        content = content.replace(
            /box-shadow: 0 4px 12px rgba\(239, 68, 68, 0\.3\);/g,
            'box-shadow: none;'
        );

        // 3. Move cloud-router.js to HEAD for faster loading (to prevent full page reload)
        // First remove it from body
        if (content.includes('<script src="cloud-router.js"></script>')) {
            content = content.replace(/\s*<script src="cloud-router.js"><\/script>/g, '');
        }

        // Then add it to head with defer (standard best practice, or without defer if we want immediate exec)
        // Since it uses DOMContentLoaded, defer is fine. But putting it in head ensures it's registered early.
        if (content.includes('</head>')) {
            content = content.replace('</head>', '    <script src="cloud-router.js" defer></script>\n</head>');
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated CSS and Router position in: ${pageName}`);

    } catch (err) {
        console.error(`Error processing ${pageName}: ${err.message}`);
    }
});
