import fs from 'fs/promises';
import path from 'path';
import { ComplexityAnalyzer } from './complexity.js';
import { SecurityAudit } from '../security/audit.js';
import { SecurityFinding, ProjectContext } from '../types.js';
import { GitEngine } from '../git/diff.js';

// Define constants for better readability and maintainability
const EXCLUDED_DIRS = ['node_modules', '.git', 'dist', '.actm_history'];
const INCLUDED_EXTENSIONS = ['.ts', '.js', '.tsx', '.jsx'];
const COMPLEXITY_THRESHOLD = 20;
const LINE_COUNT_THRESHOLD = 500;
const VOLATILITY_THRESHOLD = 60;

/**
 * Interface for storing the detailed analysis result of a single file.
 */
interface FileAnalysisResult {
    relativePath: string;
    fullPath: string;
    content: string;
    complexity: number;
    volatility: number;
    securityFindings: SecurityFinding[];
    isHighRisk: boolean;
}

export class Scanner {
    private projectPath: string;

    constructor(projectPath: string) {
        this.projectPath = projectPath;
    }

    /**
     * Initiates a comprehensive scan of the project.
     * @returns A promise that resolves to a ProjectContext object containing scan results.
     */
    async scan(): Promise<ProjectContext> {
        // Collect all relevant files asynchronously
        const files = await this._collectProjectFiles(this.projectPath);

        // Process files concurrently for better performance
        const fileAnalysisPromises = files.map(relativePath =>
            this._analyzeFile(relativePath)
        );

        // Await all file analyses
        const allFileResults = await Promise.all(fileAnalysisPromises);

        // Aggregate results from individual file analyses
        let totalComplexity = 0;
        let totalVolatility = 0;
        const highRiskFiles: string[] = [];
        const securityFlags: SecurityFinding[] = [];

        for (const result of allFileResults) {
            totalComplexity += result.complexity;
            totalVolatility += result.volatility;
            securityFlags.push(...result.securityFindings);
            if (result.isHighRisk) {
                highRiskFiles.push(result.relativePath);
            }
        }

        const fileCount = allFileResults.length;

        return {
            fileCount: fileCount,
            avgComplexity: fileCount > 0 ? totalComplexity / fileCount : 0,
            highRiskFiles,
            circularDependencies: [], // This functionality is not implemented as per original logic
            securityFlags,
            gitVolatilityScore: fileCount > 0 ? totalVolatility / fileCount : 0
        };
    }

    /**
     * Analyzes a single file for complexity, volatility, and security findings.
     * Includes robust error handling for file operations.
     * @param relativePath The path of the file relative to the project root.
     * @returns A promise that resolves to the analysis result for the file.
     */
    private async _analyzeFile(relativePath: string): Promise<FileAnalysisResult> {
        const fullPath = path.join(this.projectPath, relativePath);
        let content = '';
        let complexity = 0;
        let volatility = 0;
        let securityFindings: SecurityFinding[] = [];
        let isHighRisk = false;

        try {
            content = await fs.readFile(fullPath, 'utf-8');
            complexity = ComplexityAnalyzer.getCyclomaticComplexity(content);
            // Assuming GitEngine expects the path relative to the project root (Git repo root)
            volatility = GitEngine.getVolatilityScore(relativePath);
            securityFindings = SecurityAudit.auditFile(fullPath);

            if (
                complexity > COMPLEXITY_THRESHOLD ||
                content.split('\n').length > LINE_COUNT_THRESHOLD ||
                volatility > VOLATILITY_THRESHOLD
            ) {
                isHighRisk = true;
            }
        } catch (error) {
            // Log the error and add a security finding for inaccessible files
            console.error(`Error processing file ${fullPath}: ${(error as Error).message}`);
            securityFindings.push({
                type: 'FS_IO_ERROR',
                file: relativePath,
                line: 0,
                description: `Failed to process file due to I/O error: ${(error as Error).message}`,
                severity: 'Critical'
            });
        }

        return {
            relativePath,
            fullPath,
            content,
            complexity,
            volatility,
            securityFindings,
            isHighRisk,
        };
    }

    /**
     * Recursively collects all files in the project directory that match the inclusion criteria.
     * Excludes specified directories and only includes files with specified extensions.
     * @param dir The current directory to scan.
     * @param fileList The accumulated list of relative file paths.
     * @returns A promise that resolves to an array of relative file paths.
     */
    private async _collectProjectFiles(dir: string, fileList: string[] = []): Promise<string[]> {
        let entries;
        try {
            entries = await fs.readdir(dir, { withFileTypes: true });
        } catch (error) {
            console.error(`Error reading directory ${dir}: ${(error as Error).message}`);
            return fileList; // Return current list if directory cannot be read
        }

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                if (!EXCLUDED_DIRS.includes(entry.name)) {
                    await this._collectProjectFiles(fullPath, fileList);
                }
            } else if (INCLUDED_EXTENSIONS.includes(path.extname(entry.name))) {
                fileList.push(path.relative(this.projectPath, fullPath));
            }
        }
        return fileList;
    }
}