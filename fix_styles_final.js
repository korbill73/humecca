const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

const finalStyles = `
/* =========================================
   Requested Fixes: Button Colors & Specific Text (Final)
   ========================================= */

/* 1. Quick Quote (Glass Card) - Force White Text */
.glass-card h3, 
.glass-card p {
    color: #ffffff !important;
}

.glass-card .quick-link-title {
    color: #ffffff !important;
}

.glass-card .quick-link-desc {
    color: rgba(255, 255, 255, 0.8) !important;
}

.glass-card i {
    color: #ffffff !important;
}

/* 2. CTA Section (Bottom of Index) - Force White Text */
.cta-section h2, 
.cta-section p {
    color: #ffffff !important;
}

/* 3. KakaoTalk Button in Footer - Force Dark Text on Yellow Background */
footer a[href*="kakao"], 
.footer a[href*="kakao"] {
    color: #3C1E1E !important; /* Dark Brown text on Yellow button */
    font-weight: 800 !important;
}
`;

fs.appendFileSync(cssPath, finalStyles, 'utf8');
console.log('Applied final color fixes to styles.css');
