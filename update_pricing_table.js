const fs = require('fs');
const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_intro.html';

if (fs.existsSync(targetFile)) {
    let html = fs.readFileSync(targetFile, 'utf8');

    // Define the new Pricing Comparison Section with the Specific Text requested
    const pricingSectionHtml = `
            <div class="content-section">
                <div class="section-title">Server 요금 비교</div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                    <p style="margin: 0; color: #1e293b; font-weight: 600; font-size: 15px; line-height: 1.6;">
                        다음은 Linux 1년, 선 결제 없이 예약 30대 Outbound Network 월 30TB 이용 시 타사와 월별 이용을 비교했을 때의 가격표입니다.
                    </p>
                </div>
                
                <div style="overflow-x:auto;">
                    <table class="cloud-content table" style="width:100%; border-collapse:collapse; text-align:center; margin-top:0; border-top: 2px solid #1e293b;">
                        <thead>
                            <tr style="background:#f1f5f9;">
                                <th colspan="2" style="padding:15px; font-size:16px; color:#1e293b; font-weight:700; border-right:1px solid #d1d5db; border-bottom:1px solid #cbd5e1;">kt cloud 클라우드</th>
                                <th colspan="2" style="padding:15px; font-size:16px; color:#1e293b; font-weight:700; border-bottom:1px solid #cbd5e1;">A사</th>
                            </tr>
                            <tr style="background:#ffffff; color:#334155; font-weight:600;">
                                <td style="padding:15px; width:20%; border-bottom:1px solid #e2e8f0; border-right:1px solid #f1f5f9; background:#f8fafc;">사양</td>
                                <td style="padding:15px; width:30%; border-bottom:1px solid #e2e8f0; border-right:1px solid #d1d5db; background:#f8fafc;">요금</td>
                                <td style="padding:15px; width:20%; border-bottom:1px solid #e2e8f0; border-right:1px solid #f1f5f9; background:#f8fafc;">사양</td>
                                <td style="padding:15px; width:30%; border-bottom:1px solid #e2e8f0; background:#f8fafc;">요금</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:500;">1core / 1GB</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; border-right:1px solid #e2e8f0; color:#dc2626; font-weight:700;">948,000원</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">T2.micro</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">5,298,854 원</td>
                            </tr>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:500;">2core / 4GB</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; border-right:1px solid #e2e8f0; color:#dc2626; font-weight:700;">2,319,000 원</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">T3.medium</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">6,568,270 원</td>
                            </tr>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:500;">4core / 8GB</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; border-right:1px solid #e2e8f0; color:#dc2626; font-weight:700;">4,638,000 원</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">C5.xlarge</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">10,473,371 원</td>
                            </tr>
                             <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:500;">8core / 16GB</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; border-right:1px solid #e2e8f0; color:#dc2626; font-weight:700;">9,279,000 원</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">C5.2xlarge</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">15,975,050 원</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="margin-top:10px; font-size:12px; color:#64748b; text-align:right;">* 각 사이트 요금 계산기 기준</p>
                </div>
            </div>
`;

    // Replacement Strategy:
    // Looking for the "가격 경쟁력" section that we inserted previously.
    // It starts with <div class="section-title">가격 경쟁력</div>
    // We will replace the entire parent <div class="content-section"> around it.

    // 1. Find the title index
    const titleIndex = html.indexOf('<div class="section-title">가격 경쟁력</div>');

    if (titleIndex !== -1) {
        // 2. Find start of the container div (search backwards)
        const blockStartIndex = html.lastIndexOf('<div class="content-section">', titleIndex);

        // 3. Find the start of the NEXT section to determine end of current block
        // The next section likely starts with <div class="content-section">
        const nextBlockStartIndex = html.indexOf('<div class="content-section">', titleIndex + 20); // offset to avoid finding self

        if (blockStartIndex !== -1 && nextBlockStartIndex !== -1) {
            const pre = html.substring(0, blockStartIndex);
            const post = html.substring(nextBlockStartIndex);

            // Reassemble
            html = pre + pricingSectionHtml + '\n            ' + post;

            fs.writeFileSync(targetFile, html, 'utf8');
            console.log('Successfully updated Pricing Comparison Table with exact requested text.');
        } else {
            console.error('Could not isolate the pricing section to update.');
        }
    } else {
        console.error('Original pricing section title not found.');
    }
}
