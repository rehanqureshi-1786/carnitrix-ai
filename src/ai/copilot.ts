import { spawn } from 'child_process';

export class CopilotProvider {
    public name = 'GitHub Copilot CLI';

    async generate(prompt: string): Promise<string> {
        return new Promise((resolve, reject) => {
            // Sanitize prompt for non-interactive mode
            const sanitizedPrompt = prompt.replace(/\r?\n/g, ' ').replace(/"/g, "'").trim();

            // Using spawn to avoid shell escaping issues with complex multi-line prompts
            const child = spawn('gh', ['copilot', '-p', sanitizedPrompt], {
                shell: true,
            });

            let stdout = '';
            let stderr = '';

            child.stdout.on('data', (data) => (stdout += data.toString()));
            child.stderr.on('data', (data) => (stderr += data.toString()));

            child.on('close', (code) => {
                if (code !== 0 && !stdout) {
                    const errMsg = stderr.trim() || `Copilot CLI exited with code ${code}`;
                    reject(new Error(errMsg));
                    return;
                }
                resolve(stdout.trim());
            });

            child.on('error', (err) => reject(err));
        });
    }
}
