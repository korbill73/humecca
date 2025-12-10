const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

const restoreStyles = `
/* =========================================
   URGENT FIX: Restore Text Visibility on Dark Backgrounds
   ========================================= */

/* 1. Footer Restoration */
footer, .footer {
    color: #e5e7eb !important; /* Default light color for footer */
}

footer p, .footer p,
footer a, .footer a,
footer li, .footer li,
footer span, .footer span,
footer div, .footer div {
    color: #d1d5db !important; /* Gray 300 */
}

footer h1, footer h2, footer h3, footer h4, footer h5, footer h6,
.footer h1, .footer h2, .footer h3, .footer h4, .footer h5, .footer h6,
footer strong, .footer strong {
    color: #ffffff !important; /* Pure White Headers */
}

.footer-bottom, .footer-bottom p, .footer-bottom span {
    color: #9ca3af !important; /* Gray 400 for copyright */
}

/* 2. Main Banner & Dark Sections */
/* Targeting common slider/hero classes */
.swiper-container, .swiper-wrapper, .swiper-slide,
.hero-section, .main-visual, .visual-area,
.section-dark, .bg-dark, .bg-navy {
    color: #ffffff !important;
}

.swiper-slide h1, .swiper-slide h2, .swiper-slide h3,
.hero-section h1, .hero-section h2,
.main-visual h1, .main-visual h2 {
    color: #ffffff !important;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3); /* Ensure readability */
}

.swiper-slide p, .hero-section p, .main-visual p {
    color: #f3f4f6 !important; /* Gray 100 */
}

/* Buttons in dark areas */
.btn-primary, .btn-secondary, .btn-outline-white {
    color: #ffffff !important;
}

/* 3. Call to Action Highlighting */
.cta-section, .cta-area {
    color: #ffffff !important;
}
.cta-section h2, .cta-area h2 {
    color: #ffffff !important;
}
`;

fs.appendFileSync(cssPath, restoreStyles, 'utf8');
console.log('Restored text color for Footer and Main Banner.');
