const fs = require('fs');
const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_intro.html';

const stickyStyle = `
<style>
/* User Request 1: Sticky Header + Hero (Keep title always visible) */
/* Header is already sticky at top:0, height:80px. So we stick Hero at 80px. */
.cloud-hero {
    position: sticky !important;
    top: 80px !important; /* Stick right below the sticky header */
    z-index: 900 !important; /* Lower than header(1000) so header stays on top if overlapped */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); /* Subtle shadow to distinguish from content */
}

/* User Request 2: Align Left and Move Right by ~1.5cm (~56px) */
/* We add padding-left to the container inside Hero */
.cloud-hero .container {
    padding-left: 60px !important; /* Shift content right by ~1.5cm */
    text-align: left !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important; /* Flex align left */
    justify-content: center !important;
}

/* Ensure text elements align left */
.cloud-hero h1, .cloud-hero p, .cloud-hero .badge {
    text-align: left !important;
    margin-left: 0 !important;
    align-self: flex-start !important;
}
</style>
`;

if (fs.existsSync(targetFile)) {
    let html = fs.readFileSync(targetFile, 'utf8');

    // Check duplication
    if (!html.includes('User Request 1: Sticky Header')) {
        // Insert before </head> to override previous styles
        html = html.replace('</head>', `${stickyStyle}\n</head>`);
        fs.writeFileSync(targetFile, html, 'utf8');
        console.log('Applied sticky positioning below header and left alignment to Hero section.');
    } else {
        console.log('Sticky styles are already applied.');
    }
}
