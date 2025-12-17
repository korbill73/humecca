const fs = require('fs');
const path = require('path');

const rootDir = '.';
const placeholder = '<div id="header-placeholder"></div>';

// Function to revert file
function revertFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Regex to find the static header block we injected
        // It starts with <header class="header"> and ends with </header>
        // We use [\s\S]*? for non-greedy match across lines
        const headerRegex = /<header class="header">[\s\S]*?<\/header>/i;

        if (headerRegex.test(content)) {
            console.log(`Reverting header in: ${filePath}`);
            content = content.replace(headerRegex, placeholder);

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`  -> Success`);
            }
        } else if (content.includes('id="header-placeholder"')) {
            console.log(`Skipping (already has placeholder): ${filePath}`);
        } else {
            console.log(`Warning: No header or placeholder found in: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
}

// Main execution
fs.readdir(rootDir, (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        if (file.match(/^sub_.*\.html$/) || file === 'index.html') {
            revertFile(path.join(rootDir, file));
        }
    });
});
