const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

const newStyles = `
/* =========================================
   Unified Table Design (Red Theme) - FIX
   ========================================= */
/* Headers */
.pricing-table th,
.pricing-table th.highlight, 
.pricing-table th.highlight-sub,
.limit-table th,
.compare-table th {
    background-color: #fef2f2 !important; /* Very light red */
    color: #991b1b !important; /* Dark red text for readability */
    border: 1px solid #fee2e2 !important; 
    font-weight: 600;
}

/* Row Headers (Left column labels) */
.pricing-table .row-header {
    background-color: #fff1f2 !important;
    color: #991b1b !important;
    font-weight: 600;
}

/* Content Cells */
.pricing-table td {
    border: 1px solid #f1f5f9;
}

/* Tab Active State (Ensure Red not Purple) */
.engine-tab.active {
    border-bottom: 2px solid #dc2626 !important;
    color: #dc2626 !important;
}

/* Price Highlight */
.price {
    color: #dc2626 !important;
}
`;

fs.appendFileSync(cssPath, newStyles, 'utf8');
console.log('Appended new red-theme table styles.');
