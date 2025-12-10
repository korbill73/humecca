# -*- coding: utf-8 -*-
"""
admin.html 파일 정리 스크립트
중복된 코드를 제거하고 올바른 종료 태그 추가
"""

import os

# 파일 경로
file_path = r"c:\onedrive\OneDrive - 휴메카\08. homepage\admin.html"
output_path = r"c:\onedrive\OneDrive - 휴메카\08. homepage\admin_fixed.html"

print("파일 읽기 중...")
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"전체 라인 수: {len(lines)}")

# 1980라인까지만 유지 (0-based index이므로 1979)
keep_lines = lines[:1979]

# 올바른 종료 코드 추가
closing_code = """                    container.innerHTML = `
                        <div class="alert ${alertClass}">
                            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                            <span>${message}</span>
                        </div>
                    `;
                    setTimeout(() => container.innerHTML = '', 5000);
                }

                console.log('✅ Supabase 전체 관리 시스템 초기화 완료');
            </script>
    </body>

</html>
"""

# 파일 쓰기
print("파일 쓰기 중...")
with open(output_path, 'w', encoding='utf-8') as f:
    f.writelines(keep_lines)
    f.write(closing_code)

print(f"완료! 새 파일 생성: {output_path}")
print(f"새 파일 라인 수: {len(keep_lines) + closing_code.count(chr(10))}")
