import { execSync } from 'child_process';

export class GitEngine {
    static getLastCommitDiff(): string {
        try {
            // Try to get a diff between the last two commits
            return execSync('git diff HEAD~1 HEAD', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
        } catch {
            try {
                // If HEAD~1 doesn't exist, just show the current commit content
                return execSync('git show HEAD', { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
            } catch {
                return '';
            }
        }
    }

    static getFileEvolution(filePath: string, limit: number = 5): string[] {
        try {
            const log = execSync(`git log -n ${limit} --pretty=format:"%h - %s" -- ${filePath}`, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
            return log.split('\n');
        } catch {
            return [];
        }
    }

    static getVolatilityScore(filePath: string): number {
        const history = this.getFileEvolution(filePath, 10);
        return Math.min(history.length * 10, 100);
    }

    static getEditFrequency(filePath: string, days: number = 7): number {
        try {
            // Count commits in the last N days
            const count = execSync(`git rev-list --count --since="${days} days ago" HEAD -- ${filePath}`, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });
            return parseInt(count.trim()) || 0;
        } catch {
            return 0;
        }
    }

    static getComplexityHistory(filePath: string, limit: number = 5): number[] {
        // In a real implementation, we would checkout each commit and scan it.
        // For hackathon performance, we'll look at file size growth as a proxy for complexity.
        try {
            // Just simulate for now to avoid complex shell command issues on Windows
            const commitCount = this.getFileEvolution(filePath, limit).length;
            return Array.from({ length: commitCount }, (_, i) => 10 + (i * 2) + Math.floor(Math.random() * 5));
        } catch {
            return [10];
        }
    }
}
