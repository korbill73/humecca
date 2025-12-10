const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

const newStyles = `
/* =========================================
   Request: Increase Price Font Size (Fix)
   ========================================= */
.price {
    font-size: 16px !important; /* Increased font size */
    font-weight: 800 !important; /* Make it extra bold */
    letter-spacing: -0.3px; /* Tighter letter spacing for numbers */
}
`;

fs.appendFileSync(cssPath, newStyles, 'utf8');
console.log('Increased price font size in styles.css');
