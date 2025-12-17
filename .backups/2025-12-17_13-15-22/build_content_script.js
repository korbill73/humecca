const fs = require('fs');
const path = require('path');

const dir = 'f:/onedrive/OneDrive - 휴메카/08. homepage';
const outputFile = path.join(dir, 'cloud-content-data.js');

// 1. Build Data Object
const files = fs.readdirSync(dir).filter(f => f.startsWith('sub_cloud_') && f.endsWith('.html'));
let data = {};

console.log('Building content data from:', files);

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Extract Main Content
    // We look for <main class="cloud-content"> ... </main>
    const mainRegex = /<main class="cloud-content"[^>]*>([\s\S]*?)<\/main>/i;
    const match = content.match(mainRegex);
    if (match) {
        data[file] = match[1];
    } else {
        console.warn(`No cloud-content found in ${file}`);
    }

    // Extract Hero Content for text updates
    const heroRegex = /<section class="cloud-hero"[^>]*>([\s\S]*?)<\/section>/i;
    const heroMatch = content.match(heroRegex);
    if (heroMatch) {
        data[file + '_hero'] = heroMatch[1];
    }

    // Extract Title
    const titleRegex = /<title>(.*?)<\/title>/i;
    const titleMatch = content.match(titleRegex);
    if (titleMatch) {
        data[file + '_title'] = titleMatch[1];
    }
});

const jsOutput = `/**
 * Pre-loaded content for Cloud Sub-pages to enable local SPA routing without fetch().
 * Generated automatically.
 */
window.CLOUD_CONTENTS = ${JSON.stringify(data)};
`;

fs.writeFileSync(outputFile, jsOutput, 'utf8');
console.log('Created cloud-content-data.js');

// 2. Inject Script Tag into HTML files
files.forEach(file => {
    const filePath = path.join(dir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Inject before cloud-router.js or before </head>
    // We prefer before cloud-router.js so the data is available when router runs (though router waits for DOMContentLoaded)

    if (!html.includes('cloud-content-data.js')) {
        if (html.includes('cloud-router.js')) {
            html = html.replace(
                '<script src="cloud-router.js"',
                '<script src="cloud-content-data.js"></script>\n    <script src="cloud-router.js"'
            );
        } else {
            html = html.replace('</head>', '    <script src="cloud-content-data.js"></script>\n</head>');
        }
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Injected script tag into ${file}`);
    }
});
