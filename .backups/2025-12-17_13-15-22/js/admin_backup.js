/**
 * Local Backup System Logic
 * Connects to server.js API
 */

const BACKUP_API = 'http://localhost:3000/api/backups';
const RESTORE_API = 'http://localhost:3000/api/restore';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if running on localhost with server.js
    fetch(BACKUP_API)
        .then(() => {
            console.log('[Backup] Server Active');
            loadBackups();
        })
        .catch(() => {
            console.warn('[Backup] Server NOT active. Features disabled.');
            const btn = document.getElementById('btn-backup');
            if (btn) {
                btn.style.opacity = '0.5';
                btn.title = "node server.js를 실행해야 사용 가능합니다.";
            }
        });
});

async function loadBackups() {
    const listEl = document.getElementById('backup-list');
    if (!listEl) return;

    listEl.innerHTML = '<div style="text-align:center; padding:20px;"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';

    try {
        const res = await fetch(BACKUP_API);
        const backups = await res.json();

        if (backups.length === 0) {
            listEl.innerHTML = '<div style="text-align:center; padding:40px; color:#999;">생성된 백업이 없습니다.</div>';
            return;
        }

        listEl.innerHTML = '';
        backups.forEach(bk => {
            const date = new Date(bk.timestamp).toLocaleString();
            const div = document.createElement('div');
            div.className = 'backup-item';
            div.style.cssText = `
                display: flex; justify-content: space-between; align-items: center;
                padding: 15px; border-bottom: 1px solid #eee; background: white;
            `;
            div.innerHTML = `
                <div>
                    <div style="font-weight:bold; font-size:1.1rem; color:#333;">${date}</div>
                    <div style="color:#666; font-size:0.9rem; margin-top:4px;">${bk.memo || 'No memo'}</div>
                    <div style="color:#aaa; font-size:0.8rem;">ID: ${bk.id}</div>
                </div>
                <div>
                    <button onclick="restoreBackup('${bk.id}')" style="
                        background: #dc2626; color: white; border: none; padding: 8px 16px;
                        border-radius: 6px; cursor: pointer; font-weight: bold;
                    ">
                        <i class="fas fa-undo"></i> 복구
                    </button>
                </div>
            `;
            listEl.appendChild(div);
        });

    } catch (error) {
        listEl.innerHTML = `<div style="color:red; text-align:center;">Load Error: ${error.message}</div>`;
    }
}

async function createBackup() {
    const memo = prompt("백업 메모를 입력하세요 (예: 수정 전 안전저장):");
    if (memo === null) return;

    try {
        const res = await fetch(BACKUP_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ memo })
        });
        const data = await res.json();

        if (data.success) {
            alert('백업이 완료되었습니다.');
            loadBackups();
        } else {
            alert('백업 실패: ' + data.error);
        }
    } catch (error) {
        alert('서버 통신 오류: ' + error.message);
    }
}

async function restoreBackup(id) {
    if (!confirm('정말로 이 시점으로 복구하시겠습니까?\n현재 파일들이 덮어씌워집니다!')) return;

    try {
        const res = await fetch(RESTORE_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const data = await res.json();

        if (data.success) {
            alert('복구가 완료되었습니다! 페이지를 새로고침합니다.');
            location.reload();
        } else {
            alert('복구 실패: ' + data.error);
        }
    } catch (error) {
        alert('서버 통신 오류: ' + error.message);
    }
}

// Expose globally
window.loadBackups = loadBackups;
window.createBackup = createBackup;
window.restoreBackup = restoreBackup;
