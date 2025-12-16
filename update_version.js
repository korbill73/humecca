const fs = require('fs');
const path = require('path');

const headerPath = path.join(__dirname, 'components', 'header.html');
const loaderPath = path.join(__dirname, 'components', 'loader.js');

function updateFile(filePath, newVersion) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Regex for >v.YYYYMMDD.HHMM< (HTML)
        const htmlRegex = />v\.\d{8}\.\d{4}</g;
        // Regex for 'v.YYYYMMDD.HHMM' (JS String)
        const jsRegex = /'v\.\d{8}\.\d{4}'/g;

        let updated = false;

        if (htmlRegex.test(content)) {
            content = content.replace(htmlRegex, `>${newVersion}<`);
            updated = true;
        }

        if (jsRegex.test(content)) {
            content = content.replace(jsRegex, `'${newVersion}'`);
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`[Success] Updated ${path.basename(filePath)} to ${newVersion}`);
        } else {
            console.warn(`[Skip] No version pattern found in ${path.basename(filePath)}`);
        }
    } catch (e) {
        console.error(`[Error] Processing ${filePath}:`, e);
    }
}

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

    updateFile(headerPath, newVersion);
    updateFile(loaderPath, newVersion);

} catch (e) {
    console.error('[Error] Failed to update version:', e);
    process.exit(1);
}
