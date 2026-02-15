export class ComplexityAnalyzer {
    static getCyclomaticComplexity(code: string): number {
        // Simple estimation: count decision points
        const decisionPoints = (code.match(/\b(if|else|while|for|case|catch|&&|\|\|)\b/g) || []).length;
        return decisionPoints + 1;
    }

    static getMetrics(code: string) {
        const lines = code.split('\n');
        return {
            totalLines: lines.length,
            longFunctions: this.countLongFunctions(code),
            nestingDepth: this.getMaxNestingDepth(code)
        };
    }

    private static countLongFunctions(code: string): number {
        // Basic regex for JS/TS functions
        const functionBlocks = code.match(/function\s*.*\{|=>\s*\{/g) || [];
        // This is a stub - a real implementation would parse the AST
        return functionBlocks.length;
    }

    private static getMaxNestingDepth(code: string): number {
        let maxDepth = 0;
        let currentDepth = 0;
        for (const char of code) {
            if (char === '{') {
                currentDepth++;
                if (currentDepth > maxDepth) maxDepth = currentDepth;
            } else if (char === '}') {
                currentDepth--;
            }
        }
        return maxDepth;
    }
}
