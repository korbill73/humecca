const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, 'components', 'header.html');

try {
    let content = fs.readFileSync(headerPath, 'utf8');

    // Generate Version String: v.YYYYMMDD.HHMM
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    const newVersion = `v.${year}${month}${day}.${hour}${minute}`;

    // Regex to find existing version tag (e.g., v.20251215.1713)
    // Looking for pattern: >v.\d{8}.\d{4}< or similar
    const versionRegex = />v\.\d{8}\.\d{4}</g;

    if (versionRegex.test(content)) {
        const updatedContent = content.replace(versionRegex, `>${newVersion}<`);
        fs.writeFileSync(headerPath, updatedContent, 'utf8');
        console.log(`[Success] Updated version to ${newVersion} in components/header.html`);
    } else {
        console.error('[Error] Custom version pattern not found in header.html');
        // Fallback: Try to find a span with specific style if regex fails? 
        // Current Regex is quite specific. Let's try to match the span content more loosely if needed.
    }

} catch (e) {
    console.error('[Error] Failed to update version:', e);
    process.exit(1);
}
