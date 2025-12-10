const fs = require('fs');
const cssFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

// Fix for nested container > cloud-layout (IDC, Security, etc. pages)
const fixNestedLayoutCSS = `

/* =========================================
   FIX: Nested Container Layout Alignment
   For pages with .container > .cloud-layout structure
   (IDC, Security, VPN pages etc.)
   ========================================= */

/* When cloud-layout is inside a container, reset its padding */
.container .cloud-layout,
.sub-content .cloud-layout,
main.sub-content .container .cloud-layout {
    padding: 60px 0 !important; /* Remove horizontal padding since container already has it */
    margin: 0;
    max-width: none;
}

/* Ensure .container doesn't add extra horizontal padding when wrapping cloud-layout */
.sub-content > .container {
    padding-left: 80px;
    padding-right: 80px;
    max-width: 1440px;
    margin: 0 auto;
}

/* Override top padding from sub-content wrapper */
main.sub-content {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

/* Ensure sidebar position matches cloud pages */
.sub-content .cloud-sidebar,
.container .cloud-sidebar {
    position: sticky;
    top: 200px;
}
`;

if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Check if already applied
    if (!css.includes('FIX: Nested Container Layout Alignment')) {
        fs.appendFileSync(cssFile, fixNestedLayoutCSS, 'utf8');
        console.log('Added CSS fix for nested container layout alignment.');
    } else {
        console.log('Nested layout fix already present.');
    }
} else {
    console.error('styles.css not found!');
}
