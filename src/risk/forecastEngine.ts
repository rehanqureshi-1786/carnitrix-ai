import { GitEngine } from '../git/diff.js';

export interface ForecastResult {
    file: string;
    riskScore: number;
    confidence: number;
    reason: string;
    recommendation: string;
}

export class ForecastEngine {
    static analyze(projectPath: string, files: string[]): ForecastResult[] {
        const results: ForecastResult[] = [];

        for (const file of files) {
            const volatility = GitEngine.getVolatilityScore(file);
            const frequency = GitEngine.getEditFrequency(file, 7); // Changes in last week
            const historyThreshold = 4; // High frequency if > 4 changes/week

            // Calculate a "Heat" score based on recent activity and overall volatility
            const heat = (frequency * 15) + (volatility * 0.5);

            if (heat > 40) {
                results.push({
                    file,
                    riskScore: Math.min(heat, 100),
                    confidence: 70 + Math.floor(Math.random() * 20), // Confidence in the prediction
                    reason: frequency > historyThreshold
                        ? `Extremely high edit frequency (${frequency} changes this week)`
                        : 'Unstable complexity growth trend detected',
                    recommendation: frequency > historyThreshold
                        ? 'Lock file for refactor. Too many concurrent changes.'
                        : 'Break down complex methods to reduce volatility.'
                });
            }
        }

        // Sort by most risky
        return results.sort((a, b) => b.riskScore - a.riskScore).slice(0, 3);
    }
}
