const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

const newStyles = `
/* =========================================
   Request: Bigger Titles & Red Tabs (Fix)
   ========================================= */

/* 1. Bigger Section Titles */
.section-title {
    font-size: 22px !important; /* Increased from 15px */
    letter-spacing: -0.5px;
    margin-top: 40px !important;
    margin-bottom: 20px !important;
    padding-bottom: 12px !important;
    border-bottom: 2px solid #e2e8f0 !important;
    color: #1f2937 !important; /* Dark darker gray */
}

/* Make h4 sub-headings visible too */
h4 {
    font-size: 18px !important;
    margin-top: 24px !important;
}

.content-header h2 {
    font-size: 32px !important;
    margin-bottom: 16px !important;
}

/* 2. Red Theme Tabs (Replacing Purple) */
/* Reset any previous tab styles */
.engine-tabs {
    border-bottom: 2px solid #dc2626 !important; /* Strong red line */
    margin-bottom: 20px;
    display: flex;
    gap: 2px;
}

.engine-tab {
    padding: 12px 24px !important;
    cursor: pointer;
    font-weight: 700 !important;
    color: #64748b !important;
    background: #f1f5f9 !important;
    border: 1px solid #e2e8f0 !important;
    border-bottom: none !important;
    border-radius: 6px 6px 0 0 !important;
    margin-bottom: 0 !important;
}

.engine-tab.active {
    background: #dc2626 !important; /* Filled Red Background like the user image example? */
    /* Wait, user said "바탕이 보라색으로 연한 빨간색 공통 색으로 수정". 
       But the table header is light red. 
       If I make the tab background light red, it connects well.
       If I make it filled red (like the button in image "표준 Memory Server"), that's also an option.
       Let's go with Light Red Background to handle "common color".
       Actually, the image 2 shows a DARK BLUE button. 
       The user wants to change that to match the light red theme. */
    
    background: #fef2f2 !important; /* Light Red */
    color: #dc2626 !important; /* Red Text */
    border: 2px solid #dc2626 !important;
    border-bottom: 2px solid #fef2f2 !important; /* Connect to table */
    margin-bottom: -2px !important;
    z-index: 10;
}
`;

fs.appendFileSync(cssPath, newStyles, 'utf8');
console.log('Appended bigger titles and red tabs styles.');
