const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

let css = fs.readFileSync(cssPath, 'utf8');

// Define the start and end of the common layout CSS block
// Based on previous file views, it starts with .cloud-hero and ends with content-header p style.
// We need to be precise with whitespace, so we'll use a slightly fuzzy approach or grab the exact string from the file.

// Let's extract the block dynamically from the file content first.
// We look for the block in 'sub_cloud_server.html' section because it's the standard.
const serverSectionStartMarker = '/* --- Styles from sub_cloud_server.html --- */';
const serverSectionStart = css.indexOf(serverSectionStartMarker);

if (serverSectionStart === -1) {
    console.error('Could not find server section');
    process.exit(1);
}

const serverCss = css.substring(serverSectionStart);
// Find start of .cloud-hero
const blockStartIdx = serverCss.indexOf('.cloud-hero {');
// Find end of .content-header p rule.
// It usually looks like:
// .content-header p {
//     color: #6b7280;
//     font-size: 13px;
//     line-height: 1.6;
// }
const contentHeaderEndMarker = 'line-height: 1.6;\n        }';
const blockEndIdx = serverCss.indexOf(contentHeaderEndMarker);

if (blockStartIdx !== -1 && blockEndIdx !== -1) {
    let commonBlock = serverCss.substring(blockStartIdx, blockEndIdx + contentHeaderEndMarker.length);

    console.log('Detected common block length:', commonBlock.length);
    // console.log('Common block preview:', commonBlock.substring(0, 100));

    // Now we replace all occurrences of this common block with empty string, 
    // BUT we must keep at least one instance so the styles actually apply!
    // We will prepend this common block to the VERY TOP of the centralized section (or just keep the first one found).

    // Instead of complex logic, let's just:
    // 1. Remove ALL instances of commonBlock.
    // 2. Add commonBlock once at the beginning of the centralized area.

    // Remove all
    let newCss = css.split(commonBlock).join('\n');

    // Insert once at the start of centralized section
    const centralizedHeader = '/* =========================================\n   Centralized Styles from Cloud Sub-pages\n   ========================================= */';
    newCss = newCss.replace(centralizedHeader, centralizedHeader + '\n' + commonBlock);

    fs.writeFileSync(cssPath, newCss, 'utf8');
    console.log('Successfully deduplicated common styles.');
} else {
    console.error('Could not identify common CSS block boundaries.');
}
