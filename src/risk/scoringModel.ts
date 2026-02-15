import { ProjectContext, RiskBreakdown } from '../types.js';

export class ScoringModel {
    static calculateRisk(context: ProjectContext): RiskBreakdown {
        const complexityScore = Math.min(context.avgComplexity * 5, 100);
        const securityScore = context.securityFlags.length * 20;
        const volatilityScore = context.gitVolatilityScore;
        const codeSmellScore = context.highRiskFiles.length * 10;

        const finalScore = (
            (complexityScore * 0.35) +
            (securityScore * 0.20) +
            (volatilityScore * 0.25) +
            (codeSmellScore * 0.20)
        );

        return {
            complexity: complexityScore,
            security: Math.min(securityScore, 100),
            gitVolatility: volatilityScore,
            codeSmell: Math.min(codeSmellScore, 100),
            finalScore: Math.min(finalScore, 100)
        };
    }
}
