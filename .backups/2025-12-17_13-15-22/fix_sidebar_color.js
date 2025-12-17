const fs = require('fs');
const cssPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/styles.css';

const newStyles = `
/* =========================================
   Request: Darker Sidebar Text (Fix)
   ========================================= */
.sidebar-menu li a {
    color: #020617 !important; /* Almost Black */
    font-weight: 600 !important; /* Make text bolder like the image */
}

.sidebar-menu li a i {
    color: #020617 !important; /* Icons same dark color */
}

/* Ensure Active State remains Red/White */
.sidebar-menu li a.active {
    background-color: #dc2626 !important;
    color: #ffffff !important;
}

.sidebar-menu li a.active i {
    color: #ffffff !important;
}
`;

fs.appendFileSync(cssPath, newStyles, 'utf8');
console.log('Updated sidebar text color to darker shade.');
