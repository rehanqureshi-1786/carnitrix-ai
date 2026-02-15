import fs from 'fs';
import { ProjectContext, RiskBreakdown, SecurityFinding } from '../types.js';
import { ForecastResult } from '../risk/forecastEngine.js';

export class ReportGenerator {
    static generate(context: ProjectContext, risk: RiskBreakdown, forecasts: ForecastResult[]): string {
        const date = new Date().toLocaleString();

        let md = `# ☢️ Carnitrix-ai Project Health Report\n`;
        md += `*Generated on: ${date}*\n\n`;

        md += `## 📊 Intelligence Overview\n`;
        md += `| Metric | Value |\n`;
        md += `| :--- | :--- |\n`;
        md += `| **Total Files** | ${context.fileCount} |\n`;
        md += `| **Avg Complexity** | ${context.avgComplexity.toFixed(2)} |\n`;
        md += `| **Security Issues** | ${context.securityFlags.length} |\n`;
        md += `| **Final Risk Score** | **${risk.finalScore.toFixed(0)}/100** |\n\n`;

        md += `## 🧬 Risk Breakdown\n`;
        md += `- **Complexity Risk**: ${risk.complexity.toFixed(0)}%\n`;
        md += `- **Security Risk**: ${risk.security.toFixed(0)}%\n`;
        md += `- **Git Volatility**: ${risk.gitVolatility.toFixed(0)}%\n`;
        md += `- **Code Smells**: ${risk.codeSmell.toFixed(0)}%\n\n`;

        if (forecasts.length > 0) {
            md += `## 🔮 Predictive Failure Forecast\n`;
            md += `| File | Risk | Confidence | Recommendation |\n`;
            md += `| :--- | :--- | :--- | :--- |\n`;
            forecasts.forEach(f => {
                md += `| \`${f.file}\` | ${f.riskScore.toFixed(0)}% | ${f.confidence}% | ${f.recommendation} |\n`;
            });
            md += `\n`;
        }

        if (context.securityFlags.length > 0) {
            md += `## 🛡️ Security Audit Findings\n`;
            md += `| Type | Severity | File |\n`;
            md += `| :--- | :--- | :--- |\n`;
            context.securityFlags.forEach((sf: SecurityFinding) => {
                md += `| ${sf.type} | **${sf.severity}** | \`${sf.file}:${sf.line}\` |\n`;
            });
            md += `\n`;
        }

        md += `--- \n`;
        md += `*Powered by Carnitrix-ai Intelligence Engine*`;

        return md;
    }

    static save(filePath: string, content: string) {
        fs.writeFileSync(filePath, content);
    }
}
