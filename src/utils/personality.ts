import chalk from 'chalk';

/**
 * Personality layer for enhanced CLI messaging
 */
export class Personality {
    /**
     * Transform generic messages into composed, powerful statements
     */
    static enhance(message: string, context: 'success' | 'warning' | 'error' | 'info'): string {
        const transformations: Record<string, string> = {
            'Fix applied': '✔ Defensive patch deployed',
            'File analyzed': 'Integrity surface scanned',
            'Scan complete': 'Analysis protocol complete',
            'Vulnerability found': '⚠ Threat detected',
            'No issues found': '✓ System integrity verified',
            'Analyzing': 'Scanning integrity surface',
            'Processing': 'Executing analysis protocol',
            'Error': '✗ Critical failure',
            'Warning': '⚠ Caution advised',
        };

        for (const [key, value] of Object.entries(transformations)) {
            if (message.includes(key)) {
                message = message.replace(key, value);
            }
        }

        return message;
    }

    /**
     * Format severity score with dramatic presentation
     */
    static formatSeverity(score: number): string {
        const category = score >= 8 ? 'CRITICAL' : score >= 6 ? 'HIGH' : score >= 4 ? 'MEDIUM' : 'LOW';
        const color = score >= 8 ? chalk.red : score >= 6 ? chalk.yellow : chalk.green;

        return `
${chalk.bold('Threat Assessment:')}
  Severity Score: ${color.bold(`${score.toFixed(1)} / 10`)}
  Risk Category: ${color.bold(category)}
  Exploitability Index: ${this.getExploitability(score)}
`;
    }

    /**
     * Get exploitability description
     */
    private static getExploitability(score: number): string {
        if (score >= 9) return chalk.red.bold('CRITICAL - Immediate exploitation probable');
        if (score >= 7) return chalk.yellow.bold('HIGH - Exploitation highly feasible');
        if (score >= 5) return chalk.yellow('MEDIUM - Exploitation possible with effort');
        if (score >= 3) return chalk.green('LOW - Exploitation unlikely');
        return chalk.green('MINIMAL - Negligible threat');
    }

    /**
     * Command intro messages
     */
    static commandIntro(command: string): string {
        const intros: Record<string, string> = {
            'scan': '⚡ Initiating comprehensive integrity scan',
            'review': '🔍 Analyzing recent code modifications',
            'trend': '📊 Tracking evolutionary complexity patterns',
            'forecast': '🔮 Computing failure probability matrix',
            'fix': '🛡️ Deploying AI-guided defensive measures',
            'security': '🔒 Executing security vulnerability audit',
            'exploit-sim': '💀 Simulating theoretical exploit vectors',
            'demo': '🎬 Initiating demonstration protocol',
        };

        return intros[command] || `Executing ${command}`;
    }

    /**
     * Dramatic status messages
     */
    static status(message: string): string {
        return chalk.dim(`  ▸ ${message}`);
    }

    /**
     * Success message
     */
    static success(message: string): string {
        return chalk.green(`  ✔ ${message}`);
    }

    /**
     * Warning message
     */
    static warning(message: string): string {
        return chalk.yellow(`  ⚠ ${message}`);
    }

    /**
     * Error message
     */
    static error(message: string): string {
        return chalk.red(`  ✗ ${message}`);
    }

    /**
     * Threat detected message
     */
    static threat(message: string): string {
        return chalk.red.bold(`  ⚠ THREAT DETECTED: ${message}`);
    }
}
