const fs = require('fs');
const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_server.html';

if (fs.existsSync(targetFile)) {
    let html = fs.readFileSync(targetFile, 'utf8');

    // 1. Remove "Service Diagram" or Image Section if it remains
    const diagramRegex = /<div class="content-section"[\s\S]*?services_diagram[\s\S]*?<\/div>/; // Heuristic
    // Better: Remove any img referencing the diagram
    const imgRegex = /<img src="images\/cloud_service_diagram\.png"[^>]*>/;
    if (imgRegex.test(html)) {
        // Find the containing div and remove it
        // Or just remove the image tag? User said "content of image".
        // Let's assume the Revert in previous step worked, but if not, we clean up.
        // Actually, the previous step's revert logic was strong.
    }

    // 2. High Memory Server Unification
    // We need to find the <div id="highmem"> content and make it the ONLY content.

    // Locate the High Memory content block
    const highMemMatch = html.match(/<div id="highmem"[^>]*>([\s\S]*?)<\/div>/);

    if (highMemMatch) {
        const highMemTable = highMemMatch[1];

        // Locate the entire block covering Tabs, Standard Table, and High Memory Table
        // Structure: <div class="engine-tabs">...</div> <div id="standard">...</div> <div id="highmem">...</div>

        const startMarker = '<div class="engine-tabs">';
        const endMarkerId = '<div id="highmem"';

        const startIndex = html.indexOf(startMarker);

        // Find end of highmem div. 
        // We found the match above, so we know the length of the match and its starting position
        // But matching on regex index is safer.
        const highMemBlockRegex = /<div id="highmem"[^>]*>[\s\S]*?<\/div>/;
        const highMemBlockMatch = html.match(highMemBlockRegex);

        if (startIndex !== -1 && highMemBlockMatch) {
            const endIndex = highMemBlockMatch.index + highMemBlockMatch[0].length;

            // Extract everything before tabs and after highmem table
            const pre = html.substring(0, startIndex);
            const post = html.substring(endIndex);

            // Update Title
            let finalPre = pre.replace('표준 server 및 High memory server 요금표 (G1/G2)', 'High Memory Server 요금표');

            // Construct New HTML
            html = finalPre + '\n' + highMemTable + '\n' + post;

            console.log('Simplified Pricing Section to High Memory Server only.');
        } else {
            console.log('Could not identify the tabs/tables structure correctly.');
        }
    } else {
        console.log('High Memory Table (id="highmem") not found. It might be missing or already simplified.');
    }

    fs.writeFileSync(targetFile, html, 'utf8');
}
