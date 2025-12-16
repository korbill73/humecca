const fs = require('fs');
const path = require('path');
const https = require('https');

const imageUrls = [
    'https://kt-idc.com/_assets/img/colocation/img-colocation-01.png',
    'https://kt-idc.com/_assets/img/colocation/img-colocation-02.png',
    'https://kt-idc.com/_assets/img/colocation/img-colocation-03.png',
    'https://kt-idc.com/_assets/img/colocation/img-colocation-04.png',
    'https://kt-idc.com/_assets/img/colocation/img-colocation-05.png',
    'https://kt-idc.com/_assets/img/colocation/img-colocation-06.png'
];

const downloadDir = path.join(__dirname, 'images', 'colocation');

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
}

imageUrls.forEach(url => {
    const filename = path.basename(url);
    const filePath = path.join(downloadDir, filename);

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://kt-idc.com/'
        }
    };

    const file = fs.createWriteStream(filePath);
    https.get(url, options, (response) => {
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename} (Size: ${fs.statSync(filePath).size} bytes)`);
            });
        } else {
            console.error(`Failed to download ${filename}: Status Code ${response.statusCode}`);
            file.close();
            fs.unlink(filePath, () => { }); // Delete empty file
        }
    }).on('error', (err) => {
        fs.unlink(filePath, () => { });
        console.error(`Error downloading ${filename}: ${err.message}`);
    });
});
