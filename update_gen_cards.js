const fs = require('fs');
const path = require('path');
const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_intro.html';

// Image Path Setup
const imgDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/images';
const src1 = 'C:/Users/ideac/.gemini/antigravity/brain/ac0ba905-7263-474f-be71-3c9290381083/server_gen_1_1765282000422.png';
const src2 = 'C:/Users/ideac/.gemini/antigravity/brain/ac0ba905-7263-474f-be71-3c9290381083/server_gen_2_1765282021578.png';
const src3 = 'C:/Users/ideac/.gemini/antigravity/brain/ac0ba905-7263-474f-be71-3c9290381083/server_gen_3_1765282042632.png';

// Copy Images
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
try {
    fs.copyFileSync(src1, path.join(imgDir, 'server_gen_1.png'));
    fs.copyFileSync(src2, path.join(imgDir, 'server_gen_2.png'));
    fs.copyFileSync(src3, path.join(imgDir, 'server_gen_3.png'));
    console.log('Copied generation images.');
} catch (e) { console.error(e); }

// New HTML for Generation Section
const newGenSection = `
            <!-- 3. 서비스 구성 (서버 세대) - Updated with Full Text & Images -->
            <div class="content-section">
                <div class="section-title">서비스 구성 (서버 세대)</div>
                <div class="gen-grid">
                    <div class="gen-card gen-1" style="text-align:center;">
                        <img src="images/server_gen_1.png" alt="1st Gen Server" style="height:100px; margin-bottom:15px; width:auto; mix-blend-mode:multiply;">
                        <h4 style="border-bottom:1px solid #e2e8f0; padding-bottom:10px; margin-bottom:15px;">1세대 서버 구성</h4>
                        <p style="text-align:left; font-size:14px; color:#475569; line-height:1.7;">
                            기존세대 Haswell CPU까지 적용되는 1세대 서버입니다. 고성능 I/O 서버 필요시 SSD Server를 신청 가능합니다.
                        </p>
                    </div>
                    <div class="gen-card gen-2" style="text-align:center;">
                        <img src="images/server_gen_2.png" alt="2nd Gen Server" style="height:100px; margin-bottom:15px; width:auto; mix-blend-mode:multiply;">
                        <h4 style="border-bottom:1px solid #e2e8f0; padding-bottom:10px; margin-bottom:15px;">2세대 서버 구성</h4>
                        <p style="text-align:left; font-size:14px; color:#475569; line-height:1.7;">
                            Skylake, Broadwell 기반의 고성능 CPU 적용되는 2세대 서버 입니다. 기본적으로 SSD 루트 디스크가 제공되며, 고성능 또는 비용 최적화를 위해 데이터 디스크를 자유롭게 선택 가능합니다.
                        </p>
                    </div>
                    <div class="gen-card gen-3" style="text-align:center;">
                        <img src="images/server_gen_3.png" alt="3rd Gen Server" style="height:100px; margin-bottom:15px; width:auto; mix-blend-mode:multiply;">
                        <h4 style="color:#d92e2e; border-bottom:1px solid #e2e8f0; padding-bottom:10px; margin-bottom:15px;">3세대 서버 구성 (New)</h4>
                        <p style="text-align:left; font-size:14px; color:#475569; line-height:1.7;">
                            Cascade 기반의 고성능 CPU 적용되는 3세대 서버 입니다. Openstack플랫폼을 기반으로 고성능 VM을 제공합니다. VM당 최대 64vCore, 256GB메모리를 사용할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>`;

if (fs.existsSync(targetFile)) {
    let html = fs.readFileSync(targetFile, 'utf8');

    // Find the Generation Section
    const titleSignature = '<div class="section-title">서비스 구성 (서버 세대)</div>';
    const titleIndex = html.indexOf(titleSignature);

    if (titleIndex !== -1) {
        // Find start of this block (<div class="content-section">)
        const blockStart = html.lastIndexOf('<div class="content-section">', titleIndex);

        // Find start of the NEXT block to define end
        const nextBlockStart = html.indexOf('<div class="content-section">', titleIndex + titleSignature.length);

        if (blockStart !== -1 && nextBlockStart !== -1) {
            const pre = html.substring(0, blockStart);
            const post = html.substring(nextBlockStart);

            html = pre + newGenSection + '\n            ' + post;
            fs.writeFileSync(targetFile, html, 'utf8');
            console.log('Successfully updated Generation Section with images and full text.');
        } else {
            console.error('Could not delimit the section boundaries.');
        }
    } else {
        console.error('Could not find the section to update.');
    }
}
