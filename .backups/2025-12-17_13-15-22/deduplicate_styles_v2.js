const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

let css = fs.readFileSync(cssPath, 'utf8');

const regexMap = [
    // Hero Section
    /\.cloud-hero\s*\{[\s\S]*?\}/g,
    /\.cloud-hero \.container\s*\{[\s\S]*?\}/g,
    /\.cloud-hero \.badge\s*\{[\s\S]*?\}/g,
    /\.cloud-hero h1\s*\{[\s\S]*?\}/g,
    /\.cloud-hero p\s*\{[\s\S]*?\}/g,

    // Layout
    /\.cloud-layout\s*\{[\s\S]*?\}/g,
    /\.cloud-sidebar\s*\{[\s\S]*?\}/g,

    // Sidebar Menu (Very important as it has red active state)
    /\.sidebar-menu\s*\{[\s\S]*?\}/g,
    /\.sidebar-menu li a\s*\{[\s\S]*?\}/g,
    /\.sidebar-menu li a:hover\s*\{[\s\S]*?\}/g,
    /\.sidebar-menu li a\.active\s*\{[\s\S]*?\}/g,
    /\.sidebar-menu li a i\s*\{[\s\S]*?\}/g,
    /\.sidebar-menu li a:hover i\s*\{[\s\S]*?\}/g,
    /\.sidebar-menu li a\.active i\s*\{[\s\S]*?\}/g,

    // Content Wrapper
    /\.cloud-content\s*\{[\s\S]*?\}/g,
    /\.content-header\s*\{[\s\S]*?\}/g,
    /\.content-header h2\s*\{[\s\S]*?\}/g,
    /\.content-header p\s*\{[\s\S]*?\}/g
];

regexMap.forEach(regex => {
    let count = 0;
    css = css.replace(regex, (match) => {
        count++;
        // Keep the first instance found in the file
        if (count === 1) return match;
        // Remove subsequent instances
        return '';
    });
    console.log(`Cleaned duplicates: ${count - 1} instances removed.`);
});

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS deduplication complete.');
