// Unify all cloud pages sidebar styles to the larger font version (from sub_cloud_intro.html)
const fs = require('fs');
const path = require('path');

// List of all cloud pages to update
const cloudPages = [
    'sub_cloud_server.html',
    'sub_cloud_db.html',
    'sub_cloud_storage.html',
    'sub_cloud_network.html',
    'sub_cloud_management.html',
    'sub_cloud_monitoring.html',
    'sub_cloud_managed.html',
    'sub_cloud_vdi.html',
    'sub_cloud_private.html',
    'sub_cloud_limits.html'
];
// Note: sub_cloud_intro.html already has the larger font, so we skip it

// The unified sidebar styles (larger font version from sub_cloud_intro.html)
const unifiedSidebarStyles = `        /* Left Sidebar */
        .cloud-sidebar {
            width: 220px;
            flex-shrink: 0;
            padding: 20px 0;
            background: #fff;
        }

        .sidebar-menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .sidebar-menu li a {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 20px;
            color: #4a5568;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            border-radius: 8px;
            margin: 4px 12px;
            transition: all 0.2s ease;
        }

        .sidebar-menu li a:hover {
            color: #EF4444;
            background: #fef2f2;
        }

        .sidebar-menu li a.active {
            color: #fff;
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .sidebar-menu li a i {
            width: 20px;
            font-size: 16px;
            color: #94a3b8;
            text-align: center;
        }

        .sidebar-menu li a:hover i {
            color: #EF4444;
        }

        .sidebar-menu li a.active i {
            color: #fff;
        }`;

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

cloudPages.forEach(pageName => {
    const filePath = path.join(basePath, pageName);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Find and replace the sidebar styles section
        // Pattern to match the sidebar styles block
        const sidebarPattern = /\/\*\s*Left Sidebar\s*\*\/[\s\S]*?\.sidebar-menu li a\.active i \{[\s\S]*?\}/g;

        if (sidebarPattern.test(content)) {
            content = content.replace(sidebarPattern, unifiedSidebarStyles);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated sidebar styles: ${pageName}`);
        } else {
            // Try alternative patterns
            // Pattern for pages without "Left Sidebar" comment
            const altPattern = /\.cloud-sidebar \{[\s\S]*?\.sidebar-menu li a\.active i \{[\s\S]*?\}/g;
            if (altPattern.test(content)) {
                content = content.replace(altPattern, unifiedSidebarStyles);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated sidebar styles (alt): ${pageName}`);
            } else {
                console.log(`Pattern not found in: ${pageName}`);
            }
        }
    } catch (err) {
        console.error(`Error updating ${pageName}: ${err.message}`);
    }
});

console.log('Done!');
