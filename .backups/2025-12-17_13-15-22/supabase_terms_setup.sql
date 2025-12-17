-- Supabase Terms 테이블 설정 SQL
-- Supabase Dashboard → SQL Editor에서 실행

-- 1. 기존 테이블 삭제 (있다면)
DROP TABLE IF EXISTS public.terms CASCADE;

-- 2. 새 테이블 생성
CREATE TABLE public.terms (
    id BIGSERIAL PRIMARY KEY,
    type TEXT NOT NULL UNIQUE,
    title TEXT,
    content TEXT NOT NULL,
    version INTEGER DEFAULT 1,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 인덱스 생성
CREATE INDEX idx_terms_type ON public.terms(type);
CREATE INDEX idx_terms_active ON public.terms(active);

-- 4. RLS (Row Level Security) 비활성화
ALTER TABLE public.terms DISABLE ROW LEVEL SECURITY;

-- 또는 RLS 활성화 + 전체 공개 정책 (선택사항)
-- ALTER TABLE public.terms ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Allow public read access" ON public.terms
--     FOR SELECT USING (true);
-- 
-- CREATE POLICY "Allow public insert/update" ON public.terms
--     FOR ALL USING (true) WITH CHECK (true);

-- 5. 초기 데이터 삽입 (선택사항)
INSERT INTO public.terms (type, title, content) VALUES
('privacy', '개인정보처리방침', '개인정보처리방침 내용이 여기에 표시됩니다.'),
('terms', '이용약관', '이용약관 내용이 여기에 표시됩니다.'),
('member', '회원약관', '회원약관 내용이 여기에 표시됩니다.')
ON CONFLICT (type) DO NOTHING;

-- 6. 업데이트 트리거 생성 (updated_at 자동 갱신)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_terms_updated_at
    BEFORE UPDATE ON public.terms
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 완료!
-- 이제 admin.html에서 약관을 저장할 수 있습니다.
