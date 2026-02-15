import { ProjectContext } from '../types.js';

export class PromptBuilder {
    static buildScanPrompt(context: ProjectContext): string {
        return `Analyze this project context and provide a brief optimization strategy:
    Files: ${context.fileCount}
    Avg Complexity: ${context.avgComplexity}
    High Risk Files: ${context.highRiskFiles.join(', ')}
    Security Issues: ${context.securityFlags.length}
    `;
    }

    static buildReviewPrompt(diff: string): string {
        return `Review this code diff for architectural risks and potential bugs:
    ${diff.substring(0, 2000)} // Truncated for token efficiency
    `;
    }
}
