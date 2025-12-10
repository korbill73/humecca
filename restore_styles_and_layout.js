const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

if (fs.existsSync(cssPath)) {
    let content = fs.readFileSync(cssPath, 'utf8');

    // 1. Re-apply Layout Alignment (1440px / 80px) to match the Logo position
    // We find the current .cloud-layout definition and update it.
    // If it was reverted to 1200px/20px, we change it back to 1440px/80px.

    const oldLayoutRegex = /\.cloud-layout\s*\{[\s\S]*?max-width:\s*1200px;[\s\S]*?padding:\s*60px\s*20px;[\s\S]*?\}/;

    const correctLayout = `.cloud-layout {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    gap: 60px;
    padding: 60px 80px; /* Align with Header Container (Logo) */
    align-items: flex-start;
}`;

    if (oldLayoutRegex.test(content)) {
        content = content.replace(oldLayoutRegex, correctLayout);
        console.log('Updated cloud-layout to match logo alignment.');
    } else {
        // If regex fails (e.g. if it was already modified or formatting differs), append an override.
        console.log('Appending layout alignment override.');
        content += `
/* Visual Alignment Override: Match Header Container */
.cloud-layout {
    max-width: 1440px !important;
    padding-left: 80px !important;
    padding-right: 80px !important;
}
`;
    }

    // 2. Add Missing Table Styles (Restoring the "Clean List" look)
    // Providing default styles for tables within .cloud-content to fix the "broken look"
    if (!content.includes('/* Global Table Styles */')) {
        content += `
/* Global Table Styles (Restored) */
.cloud-content table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 30px 0 50px;
    font-size: 14px;
    border-top: 2px solid #334155; /* Dark top border for emphasis */
}

.cloud-content th {
    background-color: #f8fafc;
    color: #0f172a;
    font-weight: 700;
    padding: 16px;
    border-bottom: 1px solid #cbd5e1;
    text-align: center;
    white-space: nowrap;
}

.cloud-content td {
    padding: 16px;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
    text-align: center;
    background: white;
    vertical-align: middle;
}

.cloud-content tr:last-child td {
    border-bottom: 1px solid #cbd5e1; /* Bottom closure */
}

.cloud-content tr:hover td {
    background-color: #f8fafc; /* Hover effect */
}

/* Price Highlight Text */
.cloud-content strong {
    font-weight: 700;
}

/* Tab Button Style Restoration (Ensures tabs look like buttons, not text) */
.engine-tab {
    display: flex;
    gap: 4px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e2e8f0;
    padding: 0 4px;
}

.engine-tab button {
    padding: 12px 24px;
    background: white;
    border: 1px solid #e2e8f0;
    border-bottom: none;
    cursor: pointer;
    font-weight: 600;
    color: #64748b;
    border-radius: 8px 8px 0 0;
    transition: all 0.2s;
    font-family: inherit;
    font-size: 15px;
}

.engine-tab button:hover {
    color: #dc2626;
    background: #fef2f2;
}

.engine-tab button.active {
    background: #dc2626;
    color: white;
    border-color: #dc2626;
}
`;
        console.log('Appended global table and tab styles.');
    }

    fs.writeFileSync(cssPath, content, 'utf8');
}
