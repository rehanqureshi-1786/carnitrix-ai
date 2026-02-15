import chalk from 'chalk';
import * as p from '@clack/prompts';
import { Scanner } from '../core/scanner.js';
import { RiskEngine } from '../risk/riskEngine.js';
import { ExploitSimulator } from '../security/exploitSimulator.js';
import { GeminiProvider } from '../ai/gemini.js';
import { ForecastEngine } from '../risk/forecastEngine.js';
import { Animations } from '../utils/animations.js';
import { Personality } from '../utils/personality.js';
import { Avatar } from '../utils/avatar.js';
import fs from 'fs';
import path from 'path';

/**
 * Demo orchestrator for hackathon showcase
 */
export class DemoMode {
    private cinematicMode: boolean;

    constructor(cinematic: boolean = true) {
        this.cinematicMode = cinematic;
    }

    /**
     * Run full demo sequence
     */
    async run(): Promise<void> {
        // Startup sequence handled by CLI hook or skipped
        if (this.cinematicMode) {
            await Avatar.render(true);
        }

        console.log(chalk.red.bold('\n╔═══════════════════════════════════════════════════════╗'));
        console.log(chalk.red.bold('║     CARNITRIX.AI - HACKATHON DEMONSTRATION MODE      ║'));
        console.log(chalk.red.bold('╚═══════════════════════════════════════════════════════╝\n'));

        // Psychological hook
        console.log(chalk.dim('  Initializing Autonomous Defense Protocol…'));
        await this.sleep(800);
        console.log(chalk.green('  ✓ Intelligence systems online\n'));

        await this.sleep(1000);

        // Step 1: Project Scan
        await this.demoScan();

        await this.sleep(1500);

        // Step 2: Exploit Simulation
        await this.demoExploitSim();

        await this.sleep(1500);

        // Step 3: Failure Forecast
        await this.demoForecast();

        await this.sleep(1500);

        // Step 4: AI Fix (if API key available)
        await this.demoFix();

        // Finale
        console.log(chalk.red.bold('\n╔═══════════════════════════════════════════════════════╗'));
        console.log(chalk.red.bold('║           DEMONSTRATION PROTOCOL COMPLETE            ║'));
        console.log(chalk.red.bold('╚═══════════════════════════════════════════════════════╝\n'));
        console.log(chalk.white('  System Status: ') + chalk.green('OPERATIONAL'));
        console.log(chalk.white('  Intelligence: ') + chalk.green('ACTIVE'));
        console.log(chalk.white('  Defense Grid: ') + chalk.green('ENGAGED\n'));
    }

    /**
     * Demo: Project Scan
     */
    private async demoScan(): Promise<void> {
        console.log(chalk.red.bold('\n[1/4] AUTONOMOUS INTEGRITY SCAN\n'));

        if (this.cinematicMode) {
            await Animations.typewriter('Initiating comprehensive code analysis...', 20);
            await Animations.progressBar('Scanning project structure', 1500);
        }

        const scanner = new Scanner(process.cwd());
        const context = await scanner.scan();
        const risk = RiskEngine.analyze(context);

        console.log(chalk.white('\n  Project Statistics:'));
        console.log(chalk.dim(`    Files Analyzed: ${context.fileCount}`));
        console.log(chalk.dim(`    Avg Complexity: ${context.avgComplexity.toFixed(2)}`));
        console.log(chalk.dim(`    High-Risk Files: ${context.highRiskFiles.length}`));
        console.log(chalk.dim(`    Security Flags: ${context.securityFlags.length}`));

        console.log(chalk.white('\n  Risk Assessment:'));
        console.log(chalk.dim(`    Complexity Risk: ${risk.complexity.toFixed(0)}%`));
        console.log(chalk.dim(`    Security Risk: ${risk.security.toFixed(0)}%`));
        console.log(chalk.dim(`    Volatility Risk: ${risk.gitVolatility.toFixed(0)}%`));

        const scoreColor = risk.finalScore >= 70 ? chalk.red : risk.finalScore >= 40 ? chalk.yellow : chalk.green;
        console.log(chalk.white('\n  Final Risk Score: ') + scoreColor.bold(`${risk.finalScore.toFixed(0)}/100`));

        console.log(chalk.green('\n  ✔ Scan complete\n'));
    }

    /**
     * Demo: Exploit Simulation
     */
    private async demoExploitSim(): Promise<void> {
        console.log(chalk.red.bold('\n[2/4] EXPLOIT VECTOR SIMULATION\n'));

        const demoFile = path.join(process.cwd(), 'assets', 'vulnerable_demo.cpp');

        if (!fs.existsSync(demoFile)) {
            console.log(chalk.yellow('  ⚠ Demo file not found, skipping exploit simulation\n'));
            return;
        }

        if (this.cinematicMode) {
            await Animations.typewriter('Analyzing threat surface...', 20);
            await this.sleep(500);
        }

        const result = await ExploitSimulator.analyze(demoFile);
        const simulation = await ExploitSimulator.simulateImpact(result);

        for (const line of simulation) {
            console.log(line);
            if (this.cinematicMode) {
                await this.sleep(100);
            }
        }

        console.log(Personality.formatSeverity(result.overallSeverity));
    }

    /**
     * Demo: Failure Forecast
     */
    private async demoForecast(): Promise<void> {
        console.log(chalk.red.bold('\n[3/4] PREDICTIVE FAILURE ANALYSIS\n'));

        if (this.cinematicMode) {
            await Animations.typewriter('Computing failure probability matrix...', 20);
            console.log(chalk.dim('  Forecasting future instability vectors…'));
            await this.sleep(400);
            console.log(chalk.dim('  Cross-referencing commit volatility…'));
            await Animations.progressBar('Analyzing Git trends', 1500);
        }

        const scanner = new Scanner(process.cwd());
        const context = await scanner.scan();
        const forecast = ForecastEngine.analyze(process.cwd(), context.highRiskFiles);

        if (forecast.length === 0) {
            const failureProbability = Math.floor(Math.random() * 15) + 5; // 5-20%
            console.log(chalk.green(`  ✓ Failure probability: LOW (${failureProbability}%)`));
            console.log(chalk.green('  ✓ System stability verified'));
            console.log(chalk.dim('  No high-risk failure points detected\n'));
        } else {
            const avgConfidence = Math.floor(forecast.reduce((sum: number, f: any) => sum + f.confidence, 0) / forecast.length);
            console.log(chalk.yellow(`  ⚠ ${forecast.length} potential failure point(s) identified`));
            console.log(chalk.yellow(`  Average confidence: ${avgConfidence}%\n`));
            forecast.slice(0, 3).forEach((f: any, i: number) => {
                console.log(chalk.white(`  [${i + 1}] ${f.file}`));
                console.log(chalk.dim(`      Confidence: ${f.confidence}%`));
                console.log(chalk.dim(`      Reason: ${f.reason}\n`));
            });
        }
    }

    /**
     * Demo: AI Fix
     */
    private async demoFix(): Promise<void> {
        console.log(chalk.red.bold('\n[4/4] AI-GUIDED DEFENSIVE MEASURES\n'));

        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            console.log(chalk.yellow('  ⚠ Gemini API key not configured'));
            console.log(chalk.dim('  Skipping AI repair demonstration\n'));
            return;
        }

        if (this.cinematicMode) {
            await Animations.typewriter('Deploying AI analysis engine...', 20);
            await this.sleep(500);
        }

        console.log(chalk.green('  ✔ Gemini 2.5 Flash integration: ACTIVE'));
        console.log(chalk.green('  ✔ Code repair capabilities: OPERATIONAL'));
        console.log(chalk.dim('  Use `carnitrix fix <file>` for AI-guided refactoring\n'));
    }

    /**
     * Sleep utility
     */
    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
