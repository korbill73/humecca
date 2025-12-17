// Supabase Configuration
// 1. Supabase 가입 후 새 프로젝트를 생성하세요.
// 2. Project Settings -> API 에서 URL과 Anon Key를 복사해서 아래에 붙여넣으세요.

const SUPABASE_URL = 'https://pfowkwodqsirbaqkpfmb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_i8wY_NmKlt9qUZJPKH1f2A_yOwp3qlA';

// Supabase 클라이언트 초기화
// Supabase v2는 전역 객체로 export 되므로 window.supabase에서 가져옵니다
// Supabase 클라이언트 초기화
// Supabase v2는 전역 객체로 export 되므로 window.supabase에서 가져옵니다
let supabaseLibrary = window.supabase;

try {
    // Supabase CDN에서 createClient 함수를 가져옵니다
    const { createClient } = supabaseLibrary;
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Expose globally as window.supabase (Overwriting the library) AND window.sb
    window.supabase = client;
    window.sb = client;

    console.log('✅ Supabase 연결 성공! (Client Initialized)');
} catch (error) {
    console.error('❌ Supabase 초기화 실패:', error);
    console.error('HTML에 CDN 스크립트가 포함되어 있는지 확인해주세요.');
}
