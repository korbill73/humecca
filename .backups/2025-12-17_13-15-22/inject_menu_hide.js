const fs = require('fs');
const path = require('path');
const rootDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

const scriptContent = `
<script>
    // Menu Hide on Click Script (UX Improvement)
    document.addEventListener('DOMContentLoaded', () => {
        const menuLinks = document.querySelectorAll('.dropdown-item');
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('javascript')) {
                    const dropdown = this.closest('.dropdown-menu');
                    if (dropdown) {
                        // Immediately hide the menu to prevent it from staying open on the new page (if cursor is still there)
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        dropdown.style.display = 'none'; 
                        
                        // Note: The new page load will reset this state naturally.
                        // This just fixes the visual glitch during transition.
                    }
                }
            });
        });
    });
</script>
`;

const allFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

allFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if script already exists to avoid duplication
    if (!content.includes('// Menu Hide on Click Script')) {
        // Insert before </body> tag
        if (content.includes('</body>')) {
            content = content.replace('</body>', scriptContent + '</body>');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Injected menu hide script into ${file}`);
        }
    }
});
