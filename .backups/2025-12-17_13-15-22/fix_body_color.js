const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

const newStyles = `
/* =========================================
   Request: Darker Body Text (Unified)
   ========================================= */
body {
    color: #1f2937 !important; /* Slate 800 */
}

p, li, td, th, label, input, textarea, select {
    color: #1f2937 !important;
}

div {
    color: inherit;
}

/* Specific overrides for muted text to be slightly darker than before */
.text-muted, .section-subtitle, .cloud-hero p {
    color: #4b5563 !important; /* Slate 600 */
}

/* Ensure headings are sharp */
h1, h2, h3, h4, h5, h6, .section-title {
    color: #020617 !important; /* Slate 950 */
}
`;

fs.appendFileSync(cssPath, newStyles, 'utf8');
console.log('Updated overall body text color.');
