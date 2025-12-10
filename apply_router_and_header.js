const fs = require('fs');
const path = require('path');

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

// Cloud pages list
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

// Read source for standard Header (using sub_cloud_server.html)
const standardPagePath = path.join(basePath, 'sub_cloud_server.html');
const standardContent = fs.readFileSync(standardPagePath, 'utf8');
const headerMatch = standardContent.match(/<header class="header">[\s\S]*?<\/header>/);

if (!headerMatch) {
    console.error("Failed to extract standard header.");
    process.exit(1);
}
const standardHeader = headerMatch[0];

// Process each file
cloudPages.forEach(pageName => {
    const filePath = path.join(basePath, pageName);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // 1. Replace Header with Standard Header
        content = content.replace(/<header class="header">[\s\S]*?<\/header>/, standardHeader);

        // 2. Add cloud-router.js if not present
        if (!content.includes('cloud-router.js')) {
            // Insert before closing body
            content = content.replace('</body>', '    <script src="cloud-router.js"></script>\n</body>');
        }

        // 3. Remove inline showTab script if present (since it's now in cloud-router.js)
        const inlineScriptPattern = /<script>\s*function showTab[\s\S]*?<\/script>/;
        if (inlineScriptPattern.test(content)) {
            content = content.replace(inlineScriptPattern, '');
        }

        // 4. Update onclick="showTab(...)" to pass event explicitly for robustness
        // (Optional: cloud-router.js handles it without event arg too, but let's be safe)
        // Actually, the global function in cloud-router.js handles event.target fallback.
        // But we need to make sure the inline calls work. 
        // The inline onclick="showTab('mysql')" works because showTab is on window.

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Processed: ${pageName}`);

    } catch (err) {
        console.error(`Error processing ${pageName}: ${err.message}`);
    }
});

console.log("All cloud pages updated with standard header and router.");
