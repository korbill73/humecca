
$headerPath = (Resolve-Path ".\components\header.html").Path
$footerPath = (Resolve-Path ".\components\footer.html").Path
$loaderPath = (Resolve-Path ".\components\loader.js").Path

Write-Host "Reading component files..."
$headerContent = [System.IO.File]::ReadAllText($headerPath, [System.Text.Encoding]::UTF8)
$footerContent = [System.IO.File]::ReadAllText($footerPath, [System.Text.Encoding]::UTF8)

# Validating content
if (-not $headerContent) { Write-Error "Header content is empty!"; exit 1 }
if (-not $footerContent) { Write-Error "Footer content is empty!"; exit 1 }

# Template for loader.js (Using single-quote here-string to avoid variable expansion)
$loaderTemplate = @'
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
        placeholder.innerHTML = componentCache[componentPath];
        if (callback) callback();
        return;
    }

    // Version Control (Cache Busting) extraction
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
    return `[[HEADER_CONTENT]]`;
}

/**
 * 인라인 푸터 HTML 반환 (로컬 개발 환경용)
 * components/footer.html 내용과 동일하게 유지 (스크립트 제외)
 */
function getInlineFooter() {
    return `[[FOOTER_CONTENT]]`;
}

/**
 * 약관 모달 기능 초기화
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

    // Scroll Lock
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
'@

# Replace placeholders with actual content
$finalContent = $loaderTemplate.Replace('[[HEADER_CONTENT]]', $headerContent)
$finalContent = $finalContent.Replace('[[FOOTER_CONTENT]]', $footerContent)

Write-Host "Writing to loader.js..."
Set-Content -Path $loaderPath -Value $finalContent -Encoding UTF8
Write-Host "loader.js regenerated successfully."
