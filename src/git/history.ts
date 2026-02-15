import fs from 'fs';
import path from 'path';

export class HistoryManager {
    private historyDir: string;
    private projectPath: string;

    constructor(projectPath: string) {
        this.projectPath = projectPath;
        this.historyDir = path.join(projectPath, '.actm_history');
        if (!fs.existsSync(this.historyDir)) {
            fs.mkdirSync(this.historyDir);
        }
    }

    saveSnapshot(name: string) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const snapshotName = `${timestamp}_${name}`;
        const snapshotPath = path.join(this.historyDir, snapshotName);
        fs.mkdirSync(snapshotPath);
        // Simple recursive copy (simplified for TS migration)
        this.copyDir(this.projectPath, snapshotPath);
        console.log(`✅ Snapshot saved: ${snapshotName}`);
    }

    private copyDir(src: string, dest: string) {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
            if (['node_modules', '.git', '.actm_history', 'dist'].includes(entry.name)) continue;
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
                fs.mkdirSync(destPath, { recursive: true });
                this.copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}
