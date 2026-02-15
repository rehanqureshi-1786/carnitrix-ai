import { ProjectContext, RiskBreakdown } from '../types.js';
import { ScoringModel } from './scoringModel.js';

export class RiskEngine {
    static analyze(context: ProjectContext): RiskBreakdown {
        return ScoringModel.calculateRisk(context);
    }
}
