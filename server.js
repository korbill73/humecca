const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configuration
const BACKUP_DIR = path.join(__dirname, '.backups');
const ROOT_DIR = __dirname;
const IGNORE_LIST = ['.git', '.backups', 'node_modules', '.vscode', '.idea'];

// Middleware
app.use(cors());
app.use(express.json());
// [Debug] Request Logger
app.use((req, res, next) => {
    // Filter out distracting logs if needed, but logging all is good for now
    console.log(`[Request] ${req.method} ${req.url}`);
    next();
});
// Serve static files with NO CACHE and AUTO EXTENSION (.html)
// This matches "http-server" behavior so your links work perfectly.
app.use(express.static(ROOT_DIR, {
    extensions: ['html'], // Auto-add .html if missing
    setHeaders: (res, path) => {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Expires', '0');
    }
}));

// Ensure backup directory exists
fs.ensureDirSync(BACKUP_DIR);

/**
 * Format date for folder name: YYYY-MM-DD_HH-mm-ss
 */
function getTimestamp() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
}

// [API] Get List of Backups
app.get('/api/backups', async (req, res) => {
    try {
        const files = await fs.readdir(BACKUP_DIR);
        const backups = [];

        for (const file of files) {
            const filePath = path.join(BACKUP_DIR, file);
            const stat = await fs.stat(filePath);
            if (stat.isDirectory()) {
                // Check if meta.json exists (optional, for comments)
                let memo = '';
                try {
                    const meta = await fs.readJson(path.join(filePath, 'meta.json'));
                    memo = meta.memo || '';
                } catch (e) { }

                backups.push({
                    id: file,
                    timestamp: stat.birthtime, // or parse filename
                    name: file,
                    memo: memo
                });
            }
        }
        // Sort by newest first
        backups.sort((a, b) => b.name.localeCompare(a.name));
        res.json(backups);
    } catch (error) {
        console.error('List Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// [API] Create Backup
app.post('/api/backups', async (req, res) => {
    const { memo } = req.body;
    const timestamp = getTimestamp();
    const targetDir = path.join(BACKUP_DIR, timestamp);

    try {
        console.log(`[Backup] Creating snapshot: ${timestamp}`);
        await fs.ensureDir(targetDir);

        // Copy all files excluding ignore list
        const files = await fs.readdir(ROOT_DIR);
        for (const file of files) {
            if (IGNORE_LIST.includes(file)) continue;

            // Only copy file/folder
            await fs.copy(path.join(ROOT_DIR, file), path.join(targetDir, file));
        }

        // Save metadata
        await fs.writeJson(path.join(targetDir, 'meta.json'), {
            id: timestamp,
            created_at: new Date().toISOString(),
            memo: memo || 'Manual Backup'
        });

        res.json({ success: true, id: timestamp });
    } catch (error) {
        console.error('Backup Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// [API] Restore Backup
app.post('/api/restore', async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'No backup ID provided' });

    const sourceDir = path.join(BACKUP_DIR, id);
    if (!fs.existsSync(sourceDir)) {
        return res.status(404).json({ error: 'Backup not found' });
    }

    try {
        console.log(`[Restore] Restoring from: ${id}`);

        // 1. Safety Backup (Auto) before restore
        // const safetyName = `AUTO_SAFETY_${getTimestamp()}`;
        // await fs.copy(ROOT_DIR, path.join(BACKUP_DIR, safetyName), { filter: (src) => !src.includes('.backups') && !src.includes('node_modules') });

        // 2. Clear Root Dir (Partial)
        // We do NOT want to delete node_modules or .backups
        const currentFiles = await fs.readdir(ROOT_DIR);
        for (const file of currentFiles) {
            if (IGNORE_LIST.includes(file)) continue;
            if (file === 'server.js') continue; // Don't delete self!
            if (file === 'package.json') continue; // Keep dependencies safe
            if (file === 'package-lock.json') continue;

            await fs.remove(path.join(ROOT_DIR, file));
        }

        // 3. Copy from Backup to Root
        const backupFiles = await fs.readdir(sourceDir);
        for (const file of backupFiles) {
            if (file === 'meta.json') continue; // Don't verify meta

            await fs.copy(path.join(sourceDir, file), path.join(ROOT_DIR, file));
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Restore Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// [수정 전]
// app.listen(PORT, () => {

// [수정 후] 0.0.0.0을 꼭 추가해야 밖에서도 접속됩니다!
app.listen(PORT, '0.0.0.0', () => {
    console.log(`=============================================`);
    console.log(`🚀 Smart Development Server Running!`);
    console.log(`📡 URL: http://0.0.0.0:${PORT}`); // 로그도 헷갈리지 않게 바꿈
    console.log(`📂 Working Dir: ${ROOT_DIR}`);
    console.log(`=============================================`);
});
