#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import * as p from '@clack/prompts';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { Scanner } from './core/scanner.js';
import { RiskEngine } from './risk/riskEngine.js';
import { EvolutionEngine } from './git/evolution.js';
import { SecurityAudit } from './security/audit.js';
import { GitEngine } from './git/diff.js';
import { MemoryStore } from './memory/store.js';
import { Visuals } from './utils/visuals.js';
import { ForecastEngine } from './risk/forecastEngine.js';
import { ReportGenerator } from './utils/report.js';
import { GeminiProvider } from './ai/gemini.js';
import { CopilotProvider } from './ai/copilot.js';
import { Animations } from './utils/animations.js';
import { Personality } from './utils/personality.js';
import { Avatar } from './utils/avatar.js';
import { ExploitSimulator } from './security/exploitSimulator.js';
import { DemoMode } from './cli/demo.js';

// Configure dotenv to be silent (suppress 'injecting env' logs)
dotenv.config({ debug: false, path: '.env', override: false } as any);
// Hack to suppress the specific 'injecting env' log if it persists
if (process.env.DOTENV_CONFIG_QUIET !== 'true') {
    process.env.DOTENV_CONFIG_QUIET = 'true';
}

class CarnitrixCLI {
    program: Command;
    private ai: GeminiProvider | CopilotProvider | null = null;
    private cinematicMode: boolean = false;

    constructor() {
        this.program = new Command();
        // Try GitHub Copilot CLI first, fallback to Gemini
        try {
            this.ai = new CopilotProvider();
        } catch (err) {
            // Fallback to Gemini if Copilot CLI not available
            const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
            if (apiKey) {
                this.ai = new GeminiProvider(apiKey);
            }
        }
        this.setupCommands();
    }

    private setupCommands() {
        this.program
            .name('carnitrix')
            .description('Carnitrix-ai: Code Evolution & Risk Intelligence Engine')
            .version('1.0.0')
            .option('--cinematic', 'Enable cinematic mode with animations and typing effects')
            .addHelpText('before', Visuals.getStaticLogo())
            .hook('preAction', async (thisCommand) => {
                const opts = thisCommand.opts();
                this.cinematicMode = opts.cinematic || false;
                if (this.cinematicMode && thisCommand.args[0] !== 'demo') {
                    await Animations.playStartupSequence();
                }
            });

        this.program
            .command('scan')
            .description('Check the whole project for issues')
            .option('-o, --output <file>', 'Save results to a Markdown report file')
            .option('--stdout', 'Output report to stdout (for piping/redirection)')
            .action(async (options) => {
                const intro = this.cinematicMode
                    ? Personality.commandIntro('scan')
                    : `${Visuals.getWatchIcon()} Carnitrix Project Scan`;
                
                // Only show interactive UI if not outputting to stdout
                if (!options.stdout) {
                    p.intro(chalk.red(intro));
                }
                
                const s = p.spinner();
                if (!options.stdout) {
                    s.start('Analyzing all files and Git history...');
                }

                // Use absolute path to ensure it works from any directory
                const projectPath = path.resolve(process.cwd());
                const scanner = new Scanner(projectPath);
                const context = await scanner.scan();
                const risk = RiskEngine.analyze(context);
                const forecasts = ForecastEngine.analyze(projectPath, context.highRiskFiles);

                if (!options.stdout) {
                    s.stop('Analysis complete');

                    p.note(
                        `Files: ${context.fileCount}\n` +
                        `Avg Complexity: ${context.avgComplexity.toFixed(2)}\n` +
                        `High Risk Files: ${context.highRiskFiles.length}\n` +
                        `Security Issues: ${context.securityFlags.length}`,
                        'Project Stats'
                    );

                    p.note(
                        `Complexity: ${risk.complexity.toFixed(0)}%\n` +
                        `Security: ${risk.security.toFixed(0)}%\n` +
                        `Volatility: ${risk.gitVolatility.toFixed(0)}%\n` +
                        `Code Smell: ${risk.codeSmell.toFixed(0)}%\n\n` +
                        chalk.bold(`Final Risk Score: ${risk.finalScore.toFixed(0)}/100`),
                        'Risk Intelligence Summary'
                    );
                }

                const report = ReportGenerator.generate(context, risk, forecasts);

                if (options.stdout) {
                    // Output to stdout for piping/redirection
                    console.log(report);
                } else if (options.output) {
                    // Save to file using absolute path
                    const outputPath = path.isAbsolute(options.output) 
                        ? options.output 
                        : path.resolve(process.cwd(), options.output);
                    ReportGenerator.save(outputPath, report);
                    p.log.success(`Report saved to ${chalk.underline(outputPath)}`);
                    p.outro(chalk.red('Scan finished!'));
                } else {
                    p.outro(chalk.red('Scan finished!'));
                }
            });

        this.program
            .command('review')
            .description('Check my latest changes for problems')
            .action(async () => {
                p.intro(chalk.red(`${Visuals.getWatchIcon()} Carnitrix Latest Review`));
                const diff = GitEngine.getLastCommitDiff();
                if (!diff) {
                    p.log.warn('No recent changes found to review.');
                    return;
                }

                const s = p.spinner();
                s.start('Checking your last commit...');
                const isSecurityRelated = /auth|password|key|env|config/i.test(diff);
                const riskLevel = isSecurityRelated ? 'High' : 'Low';
                s.stop('Review complete');

                p.note(
                    `Risk Level: ${riskLevel}\n` +
                    `Potential Issues: ${isSecurityRelated ? 'Security-sensitive changes detected' : 'None detected'}\n` +
                    `Suggested Msg: ${isSecurityRelated ? 'security: update configurations' : 'refactor: general improvements'}`,
                    'Review Results'
                );
                p.outro(chalk.red('Review finished.'));
            });

        this.program
            .command('trend <file>')
            .description('Show how this file has changed over time')
            .action(async (file) => {
                p.intro(chalk.red(`${Visuals.getWatchIcon()} Carnitrix File History`));
                // Resolve file path to absolute path
                const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
                const evolution = await EvolutionEngine.analyze(filePath);
                const volatility = GitEngine.getVolatilityScore(filePath);

                p.note(
                    `File: ${evolution.fileName}\n` +
                    `Trend: ${evolution.complexityTrend.join(' ➔ ')}\n` +
                    `Volatility: ${volatility}%\n` +
                    `Last 5 Changes:\n${evolution.lastCommits.join('\n')}`,
                    'File Evolution'
                );
                p.outro(chalk.red('Analysis complete.'));
            });

        this.program
            .command('forecast')
            .description('Predict where bugs might happen next')
            .action(async () => {
                p.intro(chalk.red(`${Visuals.getWatchIcon()} Carnitrix Failure Forecast`));
                const s = p.spinner();
                s.start('Mining Git patterns...');

                const projectPath = path.resolve(process.cwd());
                const scanner = new Scanner(projectPath);
                const context = await scanner.scan();
                const forecasts = ForecastEngine.analyze(projectPath, context.highRiskFiles);

                s.stop('Forecast complete');

                if (forecasts.length === 0) {
                    p.log.info('System looks stable. No high-risk failures predicted.');
                } else {
                    forecasts.forEach(f => {
                        p.note(
                            `Target: ${f.file}\n` +
                            `Reason: ${f.reason}\n` +
                            `Risk Level: ${f.riskScore.toFixed(0)}% (Confidence: ${f.confidence}%)\n` +
                            `Action: ${f.recommendation}`,
                            'Failure Prediction'
                        );
                    });
                }
                p.outro(chalk.red('Forecast complete!'));
            });

        this.program
            .command('fix <file>')
            .description('Try to fix code automatically using AI')
            .action(async (file) => {
                p.intro(chalk.red(`${Visuals.getWatchIcon()} Carnitrix AI Repair`));

                if (!this.ai) {
                    p.log.error('No AI provider available. Install GitHub Copilot CLI or set GOOGLE_GENERATIVE_AI_API_KEY in .env file.');
                    return;
                }

                // Resolve file path to absolute path
                const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
                
                if (!fs.existsSync(filePath)) {
                    p.log.error(`File not found: ${filePath}`);
                    return;
                }

                const content = fs.readFileSync(filePath, 'utf-8');
                const s = p.spinner();
                const aiName = this.ai instanceof CopilotProvider ? 'GitHub Copilot CLI' : 'Gemini';
                s.start(`Analyzing problems in ${path.basename(filePath)} with ${aiName}...`);

                try {
                    const prompt = `Act as a senior software architect. Analyze the follow code for complexity, security risks, and code smells. Provide a refactored version that is safer and more efficient. Keep the same logic but improve the structure. Return ONLY the refactored code without explanation.\n\nCode:\n${content}`;
                    const fix = await this.ai.generate(prompt);
                    s.stop('Repair plan generated');

                    p.note(fix.slice(0, 500) + '...', 'AI Suggested Refactor (Preview)');

                    const confirmed = await p.confirm({ message: 'Apply suggested fixes?' });
                    if (confirmed) {
                        fs.writeFileSync(`${filePath}.bak`, content);
                        // Strip markdown code blocks if AI included them
                        const cleanedFix = fix.replace(/```[a-z]*\n|```/g, '').trim();
                        fs.writeFileSync(filePath, cleanedFix);
                        p.log.success(`Repairs applied successfully. Backup created as ${filePath}.bak`);
                    } else {
                        p.log.warn('Repair canceled.');
                    }
                } catch (err: any) {
                    s.stop('AI analysis failed');
                    p.log.error(`AI Error: ${err.message}`);
                }

                p.outro(chalk.red('Finished.'));
            });

        this.program
            .command('security')
            .description('Check for security holes and leaks')
            .action(() => {
                p.intro(chalk.red(`${Visuals.getWatchIcon()} Carnitrix Security Audit`));
                const projectPath = path.resolve(process.cwd());
                const scanner = new Scanner(projectPath);
                scanner.scan().then(context => {
                    p.note(
                        context.securityFlags.map(f => `${f.severity || '??'}: ${f.type} in ${f.file}:${f.line}`).join('\n') || 'No security holes found!',
                        'Safety Scan Results'
                    );
                    p.outro(chalk.red('Audit finished.'));
                });
            });

        // NEW: Exploit Simulation Command
        this.program
            .command('exploit-sim <file>')
            .description('Simulate theoretical exploit vectors (safe, non-destructive)')
            .action(async (file) => {
                const intro = this.cinematicMode
                    ? Personality.commandIntro('exploit-sim')
                    : `${Visuals.getWatchIcon()} Carnitrix Exploit Simulation`;
                p.intro(chalk.red(intro));

                // Resolve file path to absolute path
                const filePath = path.isAbsolute(file) ? file : path.resolve(process.cwd(), file);
                
                if (!fs.existsSync(filePath)) {
                    p.log.error(`File not found: ${filePath}`);
                    p.outro(chalk.red('Aborted.'));
                    return;
                }

                const s = p.spinner();
                s.start('Analyzing threat surface...');

                try {
                    const result = await ExploitSimulator.analyze(filePath);
                    s.stop('Analysis complete');

                    const simulation = await ExploitSimulator.simulateImpact(result);
                    for (const line of simulation) {
                        console.log(line);
                    }

                    if (result.exploitable) {
                        p.log.warning('CRITICAL: Exploitation highly probable');
                    } else if (result.threats.length > 0) {
                        p.log.warning('Potential vulnerabilities detected');
                    } else {
                        p.log.success('No exploitable patterns found');
                    }
                } catch (err: any) {
                    s.stop('Simulation failed');
                    p.log.error(err.message);
                }

                p.outro(chalk.red('Simulation complete.'));
            });

        // NEW: Demo Command
        this.program
            .command('demo')
            .description('Run automated hackathon demonstration')
            .action(async () => {
                const demo = new DemoMode(true); // Always cinematic for demo
                await demo.run();
            });
    }

    async run(argv: string[]) {
        if (argv.length <= 2) {
            await Visuals.playIntro();
        }
        await this.program.parseAsync(argv);
    }
}

const cli = new CarnitrixCLI();
cli.run(process.argv).catch(err => {
    console.error(chalk.red('Error:'), err.message);
    process.exit(1);
});
