import fs from 'fs';
import path from 'path';

class ContextManager {
    constructor(projectPath) {
        this.projectPath = projectPath;
        this.exclude = ['.actm_history', 'node_modules', '.git', '.actmrc'];
    }

    /**
     * Get relevant context for a specific file
     * This includes neighboring files and basic project structure
     */
    async getContext(filePath) {
        const dir = path.dirname(filePath);
        const filesInDir = fs.readdirSync(dir)
            .filter(f => !this.exclude.includes(f) && fs.statSync(path.join(dir, f)).isFile())
            .slice(0, 5); // Limit to 5 neighbors

        let context = `Project Structure: ${path.basename(this.projectPath)}\n`;
        context += `Working File: ${path.relative(this.projectPath, filePath)}\n\n`;

        context += `--- Related Files ---\n`;
        for (const file of filesInDir) {
            const fullPath = path.join(dir, file);
            if (fullPath === filePath) continue;

            const content = fs.readFileSync(fullPath, 'utf-8').slice(0, 500); // First 500 chars
            context += `File: ${file}\nContent:\n${content}\n---\n`;
        }

        return context;
    }

    /**
     * Search project for specific tags/keywords (Simple placeholder for now)
     */
    async searchContext(query) {
        // Future implementation: Grep through project
        return `Code search results for: ${query} (Feature coming soon)`;
    }
}

export default ContextManager;
