const fs = require('fs');
const filePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_security.html';

if (fs.existsSync(filePath)) {
    let html = fs.readFileSync(filePath, 'utf8');

    // We target the cloud-layout div created by generate_security_page.js
    const target = '<div class="cloud-layout" style="display:flex; gap:30px; align-items:flex-start;">';
    // We add the 'container' class and vertical padding to align with other pages
    const replacement = '<div class="cloud-layout container" style="display:flex; gap:30px; align-items:flex-start; padding-top:60px; padding-bottom:80px;">';

    if (html.includes(target)) {
        html = html.replace(target, replacement);
        fs.writeFileSync(filePath, html);
        console.log('Fixed container layout in sub_security.html');
    } else {
        // Fallback: try regex if simple string match fails due to whitespace
        const regex = /<div class="cloud-layout"[^>]*style="display:flex;[^"]*">/;
        if (regex.test(html)) {
            html = html.replace(regex, (match) => {
                // append container class
                let newTag = match.replace('class="cloud-layout"', 'class="cloud-layout container"');
                // append padding to style
                newTag = newTag.replace('style="', 'style="padding-top:60px; padding-bottom:80px; ');
                return newTag;
            });
            fs.writeFileSync(filePath, html);
            console.log('Fixed container layout in sub_security.html using regex');
        } else {
            console.log('Target layout element not found.');
        }
    }
}
