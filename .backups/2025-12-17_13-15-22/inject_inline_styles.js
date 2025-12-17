const fs = require('fs');
const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_intro.html';

const designCSS = `
<style>
/* =========================================
   INLINE STYLES FOR INTRO PAGE DESIGN
   (To ensure immediate update without cache issues)
   ========================================= */

/* Server Generation Cards */
.gen-grid {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 40px;
}
.gen-card {
    flex: 1;
    min-width: 250px;
    background: white;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, border-color 0.2s;
    position: relative;
    overflow: hidden;
}
.gen-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.gen-card h4 {
    font-size: 18px;
    margin-bottom: 12px;
    font-weight: 700;
    color: #1e293b;
}
.gen-card p {
    font-size: 14px;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
}
.gen-card.gen-1 { border-top: 5px solid #94a3b8; }
.gen-card.gen-2 { border-top: 5px solid #3b82f6; }
.gen-card.gen-3 { border-top: 5px solid #dc2626; }

/* Key Function Boxes */
.func-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}
.func-box {
    background: white;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
}
.func-box:hover {
    border-color: #94a3b8;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}
.func-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f1f5f9;
}
.func-icon {
    width: 40px;
    height: 40px;
    background: #f1f5f9;
    color: #475569;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
}
.func-box h4 {
    font-size: 16px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}
.func-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.func-list li {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 8px;
    padding-left: 14px;
    position: relative;
    line-height: 1.5;
}
.func-list li::before {
    content: "•";
    color: #3b82f6;
    position: absolute;
    left: 0;
    font-weight: bold;
}

/* Related Product Badges */
.related-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
}
.product-badge {
    background: white;
    border: 1px solid #e2e8f0;
    padding: 12px 24px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #475569;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    cursor: default;
}
.product-badge:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    background: #f0f9ff;
    transform: translateY(-2px);
}
.product-badge i { color: #94a3b8; transition: color 0.2s; }
.product-badge:hover i { color: #3b82f6; }

/* Case Study Box */
.case-study-box {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 30px;
    display: flex;
    gap: 30px;
    align-items: center;
    flex-wrap: wrap;
}
.case-content { flex: 1; min-width: 300px; }
.case-img { 
    flex: 1; 
    min-width: 300px; 
    text-align: center; 
    background: #f8fafc;
    padding: 20px;
    border-radius: 12px;
}
.case-content h4 {
    font-size: 18px;
    color: #1e293b;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.case-tag {
    font-size: 12px;
    background: #eff6ff;
    color: #3b82f6;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
}
</style>
`;

if (fs.existsSync(targetFile)) {
    let html = fs.readFileSync(targetFile, 'utf8');

    // Check if style already injected to avoid dupes (basic check)
    if (!html.includes('INLINE STYLES FOR INTRO PAGE DESIGN')) {
        // Insert before </head>
        html = html.replace('</head>', `${designCSS}\n</head>`);
        fs.writeFileSync(targetFile, html, 'utf8');
        console.log('Injected inline styles into sub_cloud_intro.html to override cache issues.');
    } else {
        console.log('Styles already seem to be present.');
    }
}
