export interface ProjectContext {
    fileCount: number;
    avgComplexity: number;
    highRiskFiles: string[];
    circularDependencies: string[];
    securityFlags: SecurityFinding[];
    gitVolatilityScore: number;
}

export interface SecurityFinding {
    type: string;
    file: string;
    line: number;
    description: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface RiskBreakdown {
    complexity: number;
    security: number;
    gitVolatility: number;
    codeSmell: number;
    finalScore: number;
}

export interface EvolutionSummary {
    fileName: string;
    complexityTrend: number[];
    volatilityScore: number;
    lastCommits: string[];
}
