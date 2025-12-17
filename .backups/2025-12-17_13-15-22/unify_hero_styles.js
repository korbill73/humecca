// Unify all cloud pages hero section styles
const fs = require('fs');
const path = require('path');

// List of all cloud pages to update
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

// Unified hero section styles (larger version)
const unifiedHeroStyles = `        /* Cloud Sub-Page Layout */
        .cloud-hero {
            background: #fff5f5;
            padding: 16px 0 14px;
            margin-top: 0;
            border-bottom: 1px solid #fecaca;
        }

        .cloud-hero .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .cloud-hero .badge {
            display: inline-block;
            font-size: 12px;
            color: #EF4444;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .cloud-hero h1 {
            color: #1f2937;
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 6px;
        }

        .cloud-hero p {
            color: #6b7280;
            font-size: 14px;
        }

        /* Two Column Layout */
        .cloud-layout {
            display: flex;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
            gap: 40px;
        }`;

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

cloudPages.forEach(pageName => {
    const filePath = path.join(basePath, pageName);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Pattern to match the hero and layout styles block
        const heroPattern = /\/\*\s*Cloud Sub-Page Layout\s*\*\/[\s\S]*?\.cloud-layout \{[\s\S]*?gap:\s*\d+px;?\s*\}/g;

        if (heroPattern.test(content)) {
            content = content.replace(heroPattern, unifiedHeroStyles);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated hero styles: ${pageName}`);
        } else {
            console.log(`Pattern not found in: ${pageName}`);
        }
    } catch (err) {
        console.error(`Error updating ${pageName}: ${err.message}`);
    }
});

console.log('Done!');
