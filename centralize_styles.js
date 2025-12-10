const fs = require('fs');
const path = require('path');

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';
const stylesPath = path.join(basePath, 'styles.css');

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
    // 'sub_vpn.html', 'sub_security.html' etc. could be added, but focusing on cloud subpages for now
];

let allNewStyles = '\n\n/* =========================================\n   Centralized Styles from Cloud Sub-pages\n   ========================================= */\n';

cloudPages.forEach(pageName => {
    const filePath = path.join(basePath, pageName);
    try {
        if (!fs.existsSync(filePath)) return;

        let content = fs.readFileSync(filePath, 'utf8');

        // Extract style block
        // Regex to capture content between <style> and </style>
        const styleRegex = /<style>([\s\S]*?)<\/style>/i;
        const match = content.match(styleRegex);

        if (match) {
            let styleContent = match[1];

            // Append to central styles with a comment header
            allNewStyles += `\n/* --- Styles from ${pageName} --- */\n${styleContent}\n`;

            // Remove the style block from the HTML file
            const newHtmlContent = content.replace(styleRegex, '');
            fs.writeFileSync(filePath, newHtmlContent, 'utf8');
            console.log(`Extracted styles from and updated: ${pageName}`);
        } else {
            console.log(`No style block found in: ${pageName}`);
        }

    } catch (err) {
        console.error(`Error processing ${pageName}: ${err.message}`);
    }
});

// Append to styles.css
try {
    fs.appendFileSync(stylesPath, allNewStyles, 'utf8');
    console.log(`Successfully appended all extracted styles to styles.css`);
} catch (err) {
    console.error(`Error updating styles.css: ${err.message}`);
}
