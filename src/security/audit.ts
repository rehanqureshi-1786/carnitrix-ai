import fs from 'fs';
import { SecurityFinding } from '../types.js';

export class SecurityAudit {
    private static rules = [
        { pattern: /AIza[0-9A-Za-z-_]{35}/, type: 'Google API Key', severity: 'Critical' },
        { pattern: /eval\s*\(/, type: 'Unsafe Eval', severity: 'High' },
        { pattern: /child_process\.exec\s*\(/, type: 'Potential Command Injection', severity: 'High' },
        { pattern: /http:\/\//, type: 'Unsafe Transport (HTTP)', severity: 'Medium' },
        { pattern: /password\s*[:=]\s*['"].*['"]/, type: 'Hardcoded Password', severity: 'Critical' }
    ];

    static auditFile(filePath: string): SecurityFinding[] {
        const findings: SecurityFinding[] = [];
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
            for (const rule of this.rules) {
                if (rule.pattern.test(lines[i])) {
                    findings.push({
                        type: rule.type,
                        file: filePath,
                        line: i + 1,
                        description: `Detected potential ${rule.type}`,
                        severity: rule.severity as any
                    });
                }
            }
        }
        return findings;
    }
}
