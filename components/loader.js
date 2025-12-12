/**
 * Component Loader (components/loader.js)
 * - Loads HTML components (header, footer) dynamically
 * - Supports caching (memoization) to prevent redundant fetches
 * - Executes <script> tags inside loaded components
 * - Supports versioning for cache busting (?v=...)
 * - Fallback for local file:// protocol
 */

const componentCache = {};

function loadComponent(placeholderId, componentPath, callback) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    // 1. 이미 로드된 컴포넌트인지 확인 (메모리 캐싱)
    if (componentCache[componentPath]) {
        // console.log(`Serving ${componentPath} from cache`);
        placeholder.innerHTML = componentCache[componentPath];
        // 비록 캐시에서 가져왔더라도 스크립트는 다시 실행하지 않음 (일반적으로)
        // 하지만 DOM에 새로 삽입되었으므로 이벤트 리스너 등은 다시 붙여야 할 수 있음.
        // 여기서는 구조만 삽입하고, 콜백(initHeaderScripts 등)을 호출하여 기능 복구.
        if (callback) callback();
        return;
    }

    // Version Control (Cache Busting) extraction
    // index.html에서 <script src="loader.js?v=2.0"></script> 형태로 호출했을 때
    // 그 버전을 가져와서 컴포넌트 fetch 시에도 적용
    const scripts = document.querySelectorAll('script');
    let version = '';
    scripts.forEach(s => {
        if (s.src && s.src.includes('loader.js?v=')) {
            version = s.src.split('v=')[1];
        }
    });

    if (!version) version = new Date().getTime(); // Fallback to timestamp if no version

    // 2. Fetch Component with version query param
    const separator = componentPath.includes('?') ? '&' : '?';
    const pathWithVersion = `${componentPath}${separator}v=${version}`;

    fetch(pathWithVersion)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            // 캐시에 저장
            componentCache[componentPath] = data;

            placeholder.innerHTML = data;

            // 3. 안에 있는 <script> 태그 실행
            // innerHTML로 넣은 스크립트는 실행되지 않으므로 수동으로 실행해줘야 함
            const scripts = placeholder.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
            });

            // 콜백 실행
            if (callback) callback();
        })
        .catch(error => {
            console.warn('Component load error (' + componentPath + '):', error);
            // 로컬 파일 시스템에서는 fetch가 작동하지 않으므로
            // 대체 로딩 시도 (iframe 방식)
            loadComponentViaFallback(placeholderId, componentPath, callback);
        });
}

/**
 * 대체 로딩 방식 (로컬 파일용)
 */
function loadComponentViaFallback(placeholderId, componentPath, callback) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    let content = '';
    if (componentPath.includes('header.html')) {
        content = getInlineHeader();
    } else if (componentPath.includes('footer.html')) {
        content = getInlineFooter();
    }

    if (content) {
        placeholder.innerHTML = content;

        // 스크립트 실행 로직 추가 (fetch 방식과 동일하게)
        const scripts = placeholder.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            document.body.appendChild(newScript);
        });

        if (callback) callback();
    }
}

/**
 * 헤더 스크립트 초기화
 */
function initHeaderScripts() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Improved Menu Interaction - Ensure only one dropdown is visible at a time
    const navItems = document.querySelectorAll('.nav-item');
    const allDropdowns = document.querySelectorAll('.dropdown-menu');

    // Function to hide all dropdowns immediately
    function hideAllDropdowns() {
        allDropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.pointerEvents = 'none';
        });
    }

    // Function to reset dropdown styles (let CSS take over)
    function resetDropdownStyles(dropdown) {
        dropdown.style.opacity = '';
        dropdown.style.visibility = '';
        dropdown.style.pointerEvents = '';
    }

    navItems.forEach(item => {
        const menu = item.querySelector('.dropdown-menu');

        // When mouse enters a nav-item
        item.addEventListener('mouseenter', () => {
            // First, force hide ALL dropdowns immediately
            hideAllDropdowns();

            // Then reset this item's dropdown to let CSS show it
            if (menu) {
                // Small delay to ensure clean transition
                setTimeout(() => {
                    resetDropdownStyles(menu);
                }, 10);
            }
        });

        // When mouse leaves a nav-item
        item.addEventListener('mouseleave', () => {
            if (menu) {
                // Force hide immediately
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.pointerEvents = 'none';

                // Reset after animation completes
                setTimeout(() => {
                    resetDropdownStyles(menu);
                }, 200);
            }
        });

        // When clicking a link inside dropdown
        if (menu) {
            const links = menu.querySelectorAll('a.dropdown-item');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    hideAllDropdowns();
                });
            });
        }
    });

    console.log('Header scripts initialized with improved menu control');
}


/**
 * 인라인 헤더 HTML 반환 (로컬 개발 환경용)
 * components/header.html 내용과 동일하게 유지
 */
function getInlineHeader() {
    return `<!-- ========== HEADER (Centralized) ========== -->
<header class="header">
    <div class="header-container container">
        <!-- Logo -->
        <a href="index.html" class="logo-link">
            <img src="images/humecca_logo.gif" alt="HUMECCA" style="height:40px;">
        </a>

        <!-- Main Navigation -->
        <nav class="nav">
            <ul class="nav-list">
                <!-- 1. Cloud (Mega Menu) -->
                <li class="nav-item">
                    <a href="sub_cloud_intro.html" class="nav-link">
                        클라우드 <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu mega-menu" style="min-width: 580px; overflow: hidden; padding: 15px;">
                        <a href="sub_cloud_intro.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-cloud"></i></div>
                            <div class="dropdown-text">
                                <span class="dropdown-title">클라우드 소개</span>
                                <span class="dropdown-desc">KT Cloud 기반 유연한 인프라</span>
                            </div>
                        </a>
                        <p class="mega-section-title">KT Cloud 서비스</p>
                        <div class="mega-grid">
                            <a href="sub_cloud_server.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">Server</span></div>
                            </a>
                            <a href="sub_cloud_db.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">데이터베이스</span></div>
                            </a>
                            <a href="sub_cloud_storage.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-hdd"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">스토리지/CDN</span></div>
                            </a>
                            <a href="sub_cloud_network.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-network-wired"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">네트워크</span></div>
                            </a>
                            <a href="sub_cloud_management.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-tasks"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">매니지먼트</span></div>
                            </a>
                            <a href="sub_cloud_vdi.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-desktop"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">VDI</span></div>
                            </a>
                            <a href="sub_cloud_private.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-lock"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">Private Cloud</span></div>
                            </a>
                        </div>

                        <div style="margin-top: 12px; border-top: 1px solid #eee; padding-top: 12px;">
                            <a href="sub_cloud_limits.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-info-circle"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">서비스별 제한사항</span></div>
                            </a>
                        </div>

                        <div class="mega-cta"
                            style="position: relative; width: 100%; text-align: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; clear: both;">
                            <a href="https://login.humecca.co.kr" target="_blank"
                                style="display: inline-block; padding: 10px 20px; background: #fff; border: 1px solid #e94d36; color: #e94d36; border-radius: 6px; text-decoration: none; font-weight: bold;">
                                <i class="fas fa-cloud"></i> 서비스 콘솔 바로가기 <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 2. IDC -->
                <li class="nav-item">
                    <a href="sub_idc_intro.html" class="nav-link">IDC <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu" style="min-width:320px;">
                        <a href="sub_idc_intro.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-building"></i></div>
                            <div class="dropdown-text">
                                <span class="dropdown-title">HUMECCA IDC</span>
                                <span class="dropdown-desc">Tier 3+ 인증 IDC 센터</span>
                            </div>
                        </a>
                        <a href="sub_hosting.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                            <div class="dropdown-text">
                                <span class="dropdown-title">서버호스팅</span>
                                <span class="dropdown-desc">고성능 전용 서버</span>
                            </div>
                        </a>
                        <a href="sub_colocation.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-network-wired"></i></div>
                            <div class="dropdown-text">
                                <span class="dropdown-title">코로케이션</span>
                                <span class="dropdown-desc">안전한 서버 입주</span>
                            </div>
                        </a>
                    </div>
                </li>

                <!-- 3. VPN -->
                <li class="nav-item"><a href="sub_vpn.html" class="nav-link">VPN 전용선</a></li>

                <!-- 4. Security -->
                <li class="nav-item">
                    <a href="sub_security.html" class="nav-link">보안 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu mega-menu" style="min-width: 500px;">
                        <p class="mega-section-title">Network Security</p>
                        <div class="mega-grid">
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-shield-alt"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">WAF (웹방화벽)</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-plus-square"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">WAF Pro</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-filter"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">클린존</span></div>
                            </a>
                        </div>
                        <p class="mega-section-title"
                            style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px;">System & Data
                            Security</p>
                        <div class="mega-grid">
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-certificate"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">Private CA</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-lock"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">Certificate Manager</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-laptop-medical"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">V3 Net Server</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">DBSAFER</span></div>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 5. Addon -->
                <li class="nav-item">
                    <a href="sub_addon_software.html" class="nav-link">부가서비스 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu mega-menu" style="min-width: 400px;">
                        <div class="menu-list" style="padding: 10px 0;">
                            <a href="sub_addon_software.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-window-maximize"></i></div>
                                <div class="text-box"><span class="title">소프트웨어</span><span class="desc">라이선스 임대</span>
                                </div>
                            </a>
                            <a href="sub_addon_backup.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-database"></i></div>
                                <div class="text-box"><span class="title">백업</span><span class="desc">데이터 보호</span>
                                </div>
                            </a>
                            <a href="sub_addon_ha.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-layer-group"></i></div>
                                <div class="text-box"><span class="title">HA(고가용성)</span><span class="desc">무중단
                                        서비스</span></div>
                            </a>
                            <a href="sub_addon_loadbalancing.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-wave-square"></i></div>
                                <div class="text-box"><span class="title">로드밸런싱</span><span class="desc">트래픽 분산</span>
                                </div>
                            </a>
                            <a href="sub_addon_cdn.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-bolt"></i></div>
                                <div class="text-box"><span class="title">CDN</span><span class="desc">속도 가속</span>
                                </div>
                            </a>
                            <a href="sub_addon_recovery.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-undo"></i></div>
                                <div class="text-box"><span class="title">데이터 복구</span><span class="desc">데이터 손상
                                        복원</span></div>
                            </a>
                            <a href="sub_addon_monitoring.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-desktop"></i></div>
                                <div class="text-box"><span class="title">모니터링</span><span class="desc">실시간 감시</span>
                                </div>
                            </a>
                        </div>
                        <div class="menu-footer"
                            style="border-top: 1px solid #f3f4f6; padding: 12px; text-align: center; background: #f9fafb;">
                            <a href="#" style="color: #dc2626; font-size: 14px; font-weight: 500;">전체 부가서비스 보기</a>
                        </div>
                    </div>
                </li>

                <!-- 6. Enterprise Solutions -->
                <li class="nav-item">
                    <a href="sub_sol_ms365.html" class="nav-link">기업솔루션 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <a href="sub_sol_ms365.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fab fa-microsoft"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">MS 365</span></div>
                        </a>
                        <a href="sub_sol_groupware.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-envelope-open-text"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">네이버웍스</span></div>
                        </a>
                        <a href="sub_web_custom.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-laptop-code"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">홈페이지 제작</span></div>
                        </a>
                    </div>
                </li>

                <!-- 7. Company (Added Icons, Adjusted Position) -->
                <li class="nav-item">
                    <a href="sub_company_intro.html" class="nav-link">회사소개 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <a href="sub_company_intro.html#intro" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-info-circle"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">회사소개</span></div>
                        </a>
                        <a href="sub_company_intro.html#history" class="dropdown-item">
                             <div class="dropdown-icon"><i class="fas fa-history"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">연혁</span></div>
                        </a>
                        <a href="sub_company_intro.html#location" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">오시는 길</span></div>
                        </a>
                    </div>
                </li>

                <!-- 8. Customer Center (Added Icons) -->
                <li class="nav-item">
                    <a href="sub_support.html" class="nav-link">고객센터</a>
                </li>
            </ul>
        </nav>

        <!-- Header Buttons -->
        <div class="header-buttons">
            <a href="https://login.humecca.co.kr/" class="btn" style="color: #64748b; font-weight: 600;">
                <i class="fas fa-power-off" style="margin-right:6px; color:#EF4444;"></i> 로그인
            </a>
        </div>
        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
    </div>
</header>`;
}

/**
 * 인라인 푸터 HTML 반환 (로컬 개발 환경용)
 * components/footer.html 내용과 동일하게 유지 (스크립트 제외)
 */
function getInlineFooter() {
    return `<footer class="footer-new" style="background-color: #111; padding: 80px 0 60px; color: #9ca3af; font-size: 13px; font-family: 'Pretendard', sans-serif; border-top: 1px solid #222;">
        <div class="container">
            <!-- Top Section -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 50px; margin-bottom: 60px;">
                <!-- 1. Consultation -->
                <div>
                     <h3 style="color: #fff; font-size: 22px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.5px;">전문가와의<br>부담 없는 상담</h3>
                    <p style="margin-bottom: 24px; line-height: 1.6; color: #6b7280;">
                        궁금한 점이 있으신가요?<br>
                        로그인 후 1:1 문의를 남겨주시면<br>
                        전문 엔지니어가 상세히 답변해 드립니다.
                    </p>
                    <div style="display: flex; gap: 12px;">
                        <a href="sub_support.html" style="background: #dc2626; color: white; padding: 10px 20px; border-radius: 4px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s;">
                            1:1 문의하기 <i class="fas fa-arrow-right" style="font-size: 11px;"></i>
                        </a>
                        <a href="javascript:void(0)" onclick="window.open('https://login.humecca.co.kr/Login/Join', 'joinPop', 'width=1000,height=800,scrollbars=yes,resizable=yes'); return false;" style="background: #374151; color: white; padding: 10px 20px; border-radius: 4px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s;">
                            회원가입
                        </a>
                    </div>
                </div>
                <!-- 2. Contact -->
                <div style="padding-left: 20px; border-left: 1px solid #222;">
                     <h4 style="color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 20px;">서비스 문의</h4>
                    <div style="margin-bottom: 20px;">
                        <a href="tel:02-418-7766" style="color: #fff; font-size: 32px; font-weight: 700; text-decoration: none; letter-spacing: -1px;">02-418-7766</a>
                    </div>
                    <div style="font-size: 13px;">
                        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #222; padding-bottom: 8px; margin-bottom: 8px;">
                            <span>평일</span>
                            <span style="color: #e5e7eb;">09:00 ~ 18:00</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>점심시간</span>
                            <span style="color: #e5e7eb;">12:00 ~ 13:00</span>
                        </div>
                        <div style="margin-top: 12px; font-size: 12px; color: #6b7280;">*주말 및 공휴일 휴무</div>
                    </div>
                </div>
                <!-- 3. Emergency & Social -->
                <div style="padding-left: 20px; border-left: 1px solid #222;">
                    <h4 style="color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 20px;">긴급 장애 대응 센터</h4>
                     <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px;">
                        <span style="color: #ef4444; font-weight: 700;">KT-IDC</span>
                        <a href="tel:02-418-4442" style="color: #fff; font-size: 24px; font-weight: 700; text-decoration: none;">02-418-4442</a>
                    </div>
                    <p style="color: #9ca3af; font-size: 13px; margin-bottom: 30px;">
                        365일 24시간 연중무휴 보안 관제 및 기술 지원
                    </p>
                    <div style="display: flex; gap: 10px;">
                         <a href="https://blog.naver.com/humecca_blog" target="_blank" style="flex: 1; background: #03C75A; color: white; height: 40px; border-radius: 4px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-weight: 700; font-size: 13px;">
                            <span style="margin-right: 6px;">N</span> 블로그
                        </a>
                        <a href="https://pf.kakao.com/_ZAWBC/chat" target="_blank" style="flex: 1; background: #FAE100; color: #371c1d; height: 40px; border-radius: 4px; display: flex; align-items: center; justify-content: center; text-decoration: none; font-weight: 700; font-size: 13px;">
                            <i class="fas fa-comment" style="margin-right: 6px;"></i> 카카오톡
                        </a>
                    </div>
                </div>
            </div>
            <div style="border-top: 1px solid #222; margin-bottom: 40px;"></div>
            <!-- Bottom Section -->
            <div>
                 <div style="display: flex; gap: 30px; font-size: 13px;">
                     <a href="javascript:void(0)" onclick="showLayerTerm('privacy')" style="color: #fff; font-weight: 600; text-decoration: none;">개인정보처리방침</a>
                    <a href="javascript:void(0)" onclick="showLayerTerm('terms')" style="text-decoration: none; color: #9ca3af; transition: color 0.2s;">이용약관</a>
                    <a href="javascript:void(0)" onclick="showLayerTerm('member')" style="text-decoration: none; color: #9ca3af; transition: color 0.2s;">회원약관</a>
                    <a href="sub_company_intro.html#location" style="text-decoration: none; color: #9ca3af; transition: color 0.2s;">오시는 길</a>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px; font-size: 12px; line-height: 1.7; color: #6b7280; margin-top:20px;">
                    <div>
                        <strong style="color: #e5e7eb; display: block; margin-bottom: 8px;">(주) 휴메카</strong>
                        <p>
                            대표이사 : 박제군 &nbsp;|&nbsp; 사업자등록번호 : 101-81-89952<br>
                            통신판매업신고 : 제 2024-서울강남-00000호
                        </p>
                        <p style="margin-top: 15px; color: #4b5563;">Copyright © 2024 HUMECCA Inc. All Rights Reserved.</p>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div>
                            <span style="color: #9ca3af; font-weight: 600;">본사</span><br>
                            서울특별시 강남구 언주로 517길 KT 강남IDC B2
                        </div>
                        <div>
                            <span style="color: #9ca3af; font-weight: 600;">기술센터 (KT-IDC)</span><br>
                            서울특별시 강남구 언주로 517길 KT 강남IDC 10F
                        </div>
                        <div>
                            <span style="color: #9ca3af; font-weight: 600;">KINX-IDC</span><br>
                            서울특별시 강남구 언주로 30길, 13 대림아크로텔
                        </div>
                        <div>
                            <span style="color: #9ca3af; font-weight: 600;">SK-IDC</span><br>
                            서울특별시 서초구 법원로 1길 6 SK브로드밴드
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- 약관 모달 -->
    <div id="term-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; justify-content: center; align-items: center;">
        <div style="background: white; width: 90%; max-width: 800px; max-height: 90vh; border-radius: 12px; display: flex; flex-direction: column; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
            <div style="padding: 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
                <h3 id="term-modal-title" style="font-size: 20px; font-weight: 700; color: #1e293b;">약관</h3>
                <button onclick="closeTermModal()" style="background: none; border: none; font-size: 28px; cursor: pointer; color: #64748b; line-height: 1;">&times;</button>
            </div>
            <div id="term-modal-content" style="padding: 30px; overflow-y: auto; line-height: 1.8; color: #333; font-size: 15px; white-space: pre-wrap; font-family: 'Pretendard', 'Noto Sans KR', sans-serif;">
                <!-- 내용이 여기에 로드됩니다 -->
            </div>
            <div style="padding: 20px; border-top: 1px solid #e5e7eb; text-align: right;">
                <button onclick="closeTermModal()" style="background: #1a1a2e; color: white; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-weight: 600;">닫기</button>
            </div>
        </div>
    </div>
    <!-- 간편 신청 모달 (Applications Modal) - Premium Design -->
    <div id="app-modal"
        style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 10000; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s ease;">

        <div class="app-modal-content"
            style="background: white; width: 90%; max-width: 520px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); transform: translateY(20px); transition: transform 0.3s ease; font-family: 'Pretendard', sans-serif;">

            <!-- Header -->
            <div
                style="background: #1e293b; padding: 24px 30px; display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #334155;">
                <div>
                    <h3 style="color: white; font-size: 1.25rem; margin: 0; font-weight: 700; letter-spacing: -0.5px;">견적/상담
                        신청</h3>
                    <p style="color: #94a3b8; font-size: 0.875rem; margin: 6px 0 0; line-height: 1.4;">전문 엔지니어가 빠르고 정확하게 안내해
                        드립니다.</p>
                </div>
                <button onclick="closeAppModal()"
                    style="background: rgba(255,255,255,0.1); border: none; color: #cbd5e1; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;">
                    <i class="fas fa-times" style="font-size: 16px;"></i>
                </button>
            </div>

            <!-- Body -->
            <div style="padding: 30px; max-height: 80vh; overflow-y: auto;">

                <!-- Selected Product Summary Card -->
                <div
                    style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                    <label
                        style="display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">선택한
                        서비스</label>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div
                            style="width: 40px; height: 40px; background: #e0f2fe; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0284c7;">
                            <i class="fas fa-server" style="font-size: 18px;"></i>
                        </div>
                        <div>
                            <div id="app-product-name-display" style="font-weight: 700; color: #0f172a; font-size: 1rem;">서버
                                호스팅</div>
                            <div id="app-product-details-display"
                                style="font-size: 0.85rem; color: #475569; margin-top: 2px;"></div>
                        </div>
                    </div>
                </div>

                <form id="application-form" onsubmit="submitApplication(event)">
                    <input type="hidden" id="app-product-type" name="product_type">
                    <input type="hidden" id="app-product-name" name="product_name">
                    <input type="hidden" id="app-product-details" name="product_details">

                    <!-- Honeypot (Spam Trap) -->
                    <div style="display:none; position:absolute; left:-9999px;">
                        <label for="app-website-url">Website</label>
                        <input type="text" id="app-website-url" name="website_url" tabindex="-1" autocomplete="off">
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label
                            style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 8px; color: #334155;">회사명
                            / 단체명 <span style="color:#ef4444">*</span></label>
                        <input type="text" id="app-company" name="company" required placeholder="예: (주)휴메카"
                            style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; transition: all 0.2s; outline: none; box-sizing: border-box;"
                            onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)';"
                            onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                        <div>
                            <label
                                style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 8px; color: #334155;">담당자
                                성함 <span style="color:#ef4444">*</span></label>
                            <input type="text" id="app-name" name="name" required placeholder="홍길동"
                                style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; transition: all 0.2s; outline: none; box-sizing: border-box;"
                                onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)';"
                                onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">
                        </div>
                        <div>
                            <label
                                style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 8px; color: #334155;">연락처
                                <span style="color:#ef4444">*</span></label>
                            <input type="tel" id="app-phone" name="phone" required placeholder="010-0000-0000"
                                style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; transition: all 0.2s; outline: none; box-sizing: border-box;"
                                onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)';"
                                onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label
                            style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 8px; color: #334155;">이메일
                            <span style="color:#ef4444">*</span></label>
                        <input type="email" id="app-email" name="email" required placeholder="example@company.com"
                            style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; transition: all 0.2s; outline: none; box-sizing: border-box;"
                            onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)';"
                            onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';">
                    </div>

                    <div style="margin-bottom: 24px;">
                        <label
                            style="display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 8px; color: #334155;">문의
                            / 요청사항</label>
                        <textarea id="app-memo" name="memo" rows="3" placeholder="궁금하신 점이나 추가 요청사항을 적어주세요."
                            style="width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; resize: vertical; transition: all 0.2s; outline: none; box-sizing: border-box;"
                            onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)';"
                            onblur="this.style.borderColor='#cbd5e1'; this.style.boxShadow='none';"></textarea>
                    </div>

                    <!-- Math Challenge -->
                    <div
                        style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between;">
                        <label
                            style="font-size: 0.875rem; font-weight: 600; color: #475569; display: flex; align-items: center; gap: 6px;">
                            <i class="fas fa-shield-alt" style="color: #64748b;"></i> 자동입력 방지
                        </label>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span id="math-challenge-q"
                                style="background: white; padding: 6px 12px; border-radius: 6px; font-weight: bold; color: #334155; font-family: monospace; letter-spacing: 2px; border: 1px solid #cbd5e1;">3
                                + 5 = ?</span>
                            <input type="number" id="math-challenge-a" required placeholder="정답"
                                style="width: 70px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; text-align: center; font-weight: 600; outline: none;"
                                onfocus="this.style.borderColor='#3b82f6';" onblur="this.style.borderColor='#cbd5e1';">
                        </div>
                        <input type="hidden" id="math-challenge-real">
                    </div>

                    <!-- Action Buttons -->
                    <button type="submit" id="btn-app-submit"
                        style="width: 100%; background: #dc2626; color: white; padding: 16px; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2);">
                        상담 신청하기
                    </button>
                </form>
            </div>
        </div>
    </div>
    <!-- 앱 모달 스크립트 로드 -->
    <script src="js/application_modal.js"></script>`;
}

/**
 * 약관 모달 기능 초기화
 */
/**
 * 약관 레이어 팝업 표시
 * @param {string} type - 'privacy' | 'terms' | 'member'
 */
function showLayerTerm(type) {
    let modal = document.getElementById('term-modal-wrapper');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'term-modal-wrapper';
        modal.className = 'term-modal-overlay';
        modal.innerHTML = `
            <div class="term-modal">
                <div class="term-header">
                    <h3 id="term-modal-title">약관</h3>
                    <button class="term-close-btn" onclick="hideLayerTerm()"><i class="fas fa-times"></i></button>
                </div>
                 <div class="term-body" id="term-modal-content">
                    <div style="display:flex; justify-content:center; align-items:center; height:200px;">
                        <i class="fas fa-spinner fa-spin fa-2x" style="color:#d1d5db;"></i>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideLayerTerm();
        });
    }

    // Scroll Lock with padding adjustment to prevent shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';

    // Show
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    const titleEl = document.getElementById('term-modal-title');
    const contentEl = document.getElementById('term-modal-content');

    let title = '약관';
    if (type === 'privacy') title = '개인정보처리방침';
    else if (type === 'terms') title = '이용약관';
    else if (type === 'member') title = '회원약관';
    titleEl.textContent = title;

    // Load content
    if (typeof supabase !== 'undefined') {
        contentEl.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:200px;"><i class="fas fa-spinner fa-spin fa-2x" style="color:#d1d5db;"></i></div>';
        supabase
            .from('terms')
            .select('content')
            .eq('type', type)
            .single()
            .then(({ data, error }) => {
                if (data && data.content) {
                    contentEl.innerHTML = data.content.replace(/\n/g, '<br>');
                } else {
                    // Fallback to local storage (existing logic)
                    let localContent = localStorage.getItem('humecca_term_v4_' + type);
                    if (localContent) {
                        contentEl.innerHTML = localContent;
                    } else {
                        contentEl.innerHTML = '<div style="text-align:center; padding:40px; color:#64748b;">등록된 약관 내용이 없습니다.</div>';
                    }
                }
            });
    } else {
        // Fallback if supabase not loaded
        let localContent = localStorage.getItem('humecca_term_v4_' + type);
        if (localContent) {
            contentEl.innerHTML = localContent;
        } else {
            contentEl.innerHTML = '<div style="text-align:center; padding:40px; color:#64748b;">약관 내용을 불러올 수 없습니다.</div>';
        }
    }
}

/**
 * 약관 레이어 숨김
 */
function hideLayerTerm() {
    const modal = document.getElementById('term-modal-wrapper');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }, 300); // Wait for transition
    }
}

// Global exposure
window.closeTermModal = hideLayerTerm;
window.initTermsModal = () => { };
