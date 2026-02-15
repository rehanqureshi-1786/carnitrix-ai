import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Avatar rendering utility
 */
export class Avatar {
    private static avatarPath = path.join(process.cwd(), 'assets', 'avatar.txt');

    /**
     * Load avatar from file
     */
    static load(): string {
        try {
            if (fs.existsSync(this.avatarPath)) {
                return fs.readFileSync(this.avatarPath, 'utf-8');
            }
        } catch (error) {
            // Silently fail if avatar not found
        }
        return '';
    }

    /**
     * Render avatar with optional animation
     */
    static async render(animated: boolean = false): Promise<void> {
        const avatar = this.load();
        if (!avatar) return;

        if (animated) {
            const lines = avatar.split('\n');
            for (const line of lines) {
                console.log(chalk.red(line));
                await this.sleep(50);
            }
        } else {
            console.log(chalk.red(avatar));
        }
    }

    /**
     * Sleep utility
     */
    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
