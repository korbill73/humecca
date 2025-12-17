const fs = require('fs');
const cssFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

// These are the STANDARD styles from sub_cloud_intro.html that need to apply to ALL cloud pages
const globalCloudStyles = `

/* =========================================
   GLOBAL CLOUD PAGE STYLES (STANDARD)
   Applied to ALL cloud subpages
   ========================================= */

/* Sticky Hero Section - Always visible below header */
.cloud-hero {
    position: sticky;
    top: 80px; /* Below the sticky header (80px height) */
    z-index: 900;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* Hero Container - Left aligned, indented 1.5cm */
.cloud-hero .container {
    padding-left: 60px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

/* Hero Text Elements - Ensure left alignment */
.cloud-hero h1,
.cloud-hero p,
.cloud-hero .badge {
    text-align: left;
    margin-left: 0;
    align-self: flex-start;
}

/* Cloud Layout Container - Consistent spacing */
.cloud-layout {
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    gap: 60px;
    padding: 60px 80px;
    align-items: flex-start;
}

/* Sidebar - Fixed width and standard styling */
.cloud-sidebar {
    width: 240px;
    min-width: 240px;
    position: sticky;
    top: 200px; /* Hero (120px approx) + Header (80px) */
}

.cloud-sidebar .sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cloud-sidebar .sidebar-menu li {
    margin-bottom: 4px;
}

.cloud-sidebar .sidebar-menu a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    color: #64748b;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    transition: all 0.2s ease;
}

.cloud-sidebar .sidebar-menu a:hover {
    background: #f8fafc;
    color: #1e293b;
}

.cloud-sidebar .sidebar-menu a.active {
    background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
    color: white;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.cloud-sidebar .sidebar-menu a i {
    width: 20px;
    text-align: center;
    font-size: 14px;
}

/* Main Content Area */
.cloud-content {
    flex: 1;
    min-width: 0;
}

/* Content Header */
.cloud-content .content-header {
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #e2e8f0;
}

.cloud-content .content-header h2 {
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 12px;
}

.cloud-content .content-header p {
    font-size: 16px;
    color: #64748b;
    line-height: 1.7;
}

/* Section Title */
.cloud-content .section-title {
    font-size: 22px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #e2e8f0;
}

/* Content Section */
.cloud-content .content-section {
    margin-bottom: 50px;
}
`;

if (fs.existsSync(cssFile)) {
    let css = fs.readFileSync(cssFile, 'utf8');

    // Check if already applied
    if (!css.includes('GLOBAL CLOUD PAGE STYLES (STANDARD)')) {
        fs.appendFileSync(cssFile, globalCloudStyles, 'utf8');
        console.log('Appended GLOBAL CLOUD PAGE STYLES to styles.css');
    } else {
        console.log('Global cloud styles already present in styles.css');
    }
} else {
    console.error('styles.css not found!');
}
