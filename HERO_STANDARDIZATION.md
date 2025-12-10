# Hero Section Standardization Report

## Standard Hero Style (Based on sub_addon_recovery.html)

```html
<section class="sw-hero" style="background-color: #1a237e;">
    <div class="container">
        <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 20px;">
            카테고리 <i class="fas fa-chevron-right" style="font-size: 10px; margin: 0 8px;"></i> 페이지명
        </div>
        <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; border: 1px solid rgba(255,255,255,0.2);">
            <i class="fas fa-icon" style="font-size: 30px; color: white;"></i>
        </div>
        <h1>페이지 제목</h1>
        <p style="max-width: 800px; color: rgba(255,255,255,0.8); line-height: 1.6;">
            페이지 설명
        </p>
    </div>
</section>
```

## Key Elements:
1. **Class**: `sw-hero` (defined in styles.css)
2. **Background**: Dark color (#1a237e, #0f172a, etc.)
3. **Breadcrumb**: Small text with chevron icon
4. **Icon Box**: 60x60, rounded, semi-transparent white background
5. **Title**: `<h1>` (styled by sw-hero class)
6. **Description**: `<p>` with max-width: 800px

## Pages to Update:
- sub_idc_intro.html (IDC)  
- sub_vpn.html (VPN 전용선)
- sub_security.html (Security)
- sub_addon_software.html (소프트웨어 임대)
- sub_sol_ms365.html (Microsoft 365)
- sub_support.html (고객지원) - Already updated
- All other sub_* pages (excluding cloud pages)

## Standardization Checklist:
- [ ] Breadcrumb navigation
- [ ] Icon box (60x60)
- [ ] Consistent h1 styling
- [ ] Description max-width: 800px
- [ ] Dark background
- [ ] Center-aligned text
- [ ] Padding: 100px 0 (from sw-hero class)
