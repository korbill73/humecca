const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

if (fs.existsSync(cssPath)) {
    let content = fs.readFileSync(cssPath, 'utf8');

    // 1. Add Pricing Table Highlights (To match the logo color for prices)
    // The user specifically mentioned that some prices should match the logo color (Red).
    // Based on sub_cloud_server.html, the classes used are 'td.price'.

    let stylesToAdd = `
/* ==========================================================================
   Pricing & Design Updates (User Request)
   ========================================================================== */

/* 1. Pricing Highlight (Logo Color) */
.cloud-content td.price {
    color: #dc2626 !important; /* Humecca Red */
    font-weight: 700;
}

.cloud-content .highlight-sub {
    background-color: #f1f5f9;
    color: #334155;
    font-weight: 600;
}

/* 2. Stylish Service Overview (Feature Cards) */
/* Replaces simple text with a modern card grid layout */

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin: 40px 0 60px;
}

.feature-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    transition: all 0.3s ease;
    position: relative;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08); /* Soft shadow */
    border-color: #fca5a5; /* Red tint border */
}

/* Icon Styling */
.feature-card .icon {
    width: 64px;
    height: 64px;
    background: #fef2f2; /* Light Red bg */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #dc2626;
    font-size: 24px;
    transition: transform 0.3s;
}

.feature-card:hover .icon {
    transform: scale(1.1) rotate(5deg);
    background: #dc2626;
    color: white;
}

/* Typography for Features */
.feature-card h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
}

.feature-card p {
    font-size: 15px;
    color: #64748b;
    line-height: 1.6;
}

/* Content Header Tweaks */
.content-header {
    margin-bottom: 40px;
}

.content-header p {
    font-size: 18px;
    line-height: 1.8;
    color: #475569;
}
`;
    // We append these styles to strictly override whatever is there.
    content += stylesToAdd;

    fs.writeFileSync(cssPath, content, 'utf8');
    console.log('Applied pricing colors and modern feature design styles.');
}
