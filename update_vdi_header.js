const fs = require('fs');
const path = require('path');

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';
const sourceFile = path.join(basePath, 'sub_cloud_server.html');
const targetFile = path.join(basePath, 'sub_cloud_vdi.html');

try {
    const sourceContent = fs.readFileSync(sourceFile, 'utf8');
    const targetContent = fs.readFileSync(targetFile, 'utf8');

    // Extract header from source
    const headerMatch = sourceContent.match(/<header class="header">[\s\S]*?<\/header>/);
    if (!headerMatch) {
        throw new Error('Could not find header in source file');
    }
    const newHeader = headerMatch[0];

    // Replace header in target
    const updatedContent = targetContent.replace(/<header class="header">[\s\S]*?<\/header>/, newHeader);

    fs.writeFileSync(targetFile, updatedContent, 'utf8');
    console.log('Successfully updated header in sub_cloud_vdi.html');

} catch (err) {
    console.error('Error:', err.message);
}
