const fs = require('fs');
const path = require('path');

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

const cloudPages = [
    'sub_cloud_intro.html',
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

cloudPages.forEach(pageName => {
    const filePath = path.join(basePath, pageName);
    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace 'transition: all' with specific properties in sidebar styles
        // The pattern matches the sidebar transition property specifically

        // Before: transition: all 0.2s ease;
        // After: transition: color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;

        // We look for the sidebar styling block
        const sidebarStyleRegex = /(\.sidebar-menu li a\s*{[\s\S]*?)(transition:\s*all\s*0\.2s\s*ease;)/g;

        if (sidebarStyleRegex.test(content)) {
            content = content.replace(sidebarStyleRegex, (match, p1, p2) => {
                return p1 + 'transition: color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;';
            });
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated transition in: ${pageName}`);
        } else {
            // It might be single line or differently formatted, try simple replacement if contained in sidebar block
            // But to be safe, let's just replace the string globally if it looks like the sidebar transition
            // Risk: might replace other transitions. But 'all 0.2s ease' is specific enough if we are careful.

            // Let's rely on the fact we unified styles recently.
            // The unifying script wrote: "transition: all 0.2s ease;" inside .sidebar-menu li a

            const specificReplacement = content.replace(
                /transition: all 0.2s ease;/g,
                'transition: color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;'
            );

            if (content !== specificReplacement) {
                fs.writeFileSync(filePath, specificReplacement, 'utf8');
                console.log(`Updated transition (global replace) in: ${pageName}`);
            } else {
                console.log(`No matching transition found in: ${pageName}`);
            }
        }
    } catch (err) {
        console.error(`Error processing ${pageName}: ${err.message}`);
    }
});
