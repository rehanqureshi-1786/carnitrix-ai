import chalk from 'chalk';

/**
 * Animation utilities for cinematic terminal effects
 */
export class Animations {
    /**
     * Sleep utility for animation delays
     */
    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Typewriter effect for text output
     */
    static async typewriter(text: string, speed: number = 30): Promise<void> {
        for (const char of text) {
            process.stdout.write(char);
            await this.sleep(speed);
        }
        process.stdout.write('\n');
    }



    /**
     * Play the cinematic startup sequence
     */
    /**
     * Enhanced circular Omnitrix logo - User's custom design
     */
    private static cinematicLogo = [
        chalk.red('                            @@@@@@@@@@@@@@                            '),
        chalk.red('                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@                     '),
        chalk.red('                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                  '),
        chalk.red('               @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@               '),
        chalk.red('             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@             '),
        chalk.red('           @@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@           '),
        chalk.red('         @@@@@@@@@@@@@@@                      @@@@@@@@@@@@@@@         '),
        chalk.red('        @@@@@@@@@@@@@                            @@@@@@@@@@@@@        '),
        chalk.red('       @@@@@@@@@@@                                  @@@@@@@@@@@       '),
        chalk.red('     @@@@@@@@@@@@@                                  @@@@@@@@@@@@@     '),
        chalk.red('     @@@@@@@@@@@@@@@                              @@@@@@@@@@@@@@@     '),
        chalk.red('    @@@@@@@@@@@@@@@@@@                          @@@@@@@@@@@@@@@@@@    '),
        chalk.red('   @@@@@@@@@@@@@@@@@@@@@                      @@@@@@@@@@@@@@@@@@@@@   '),
        chalk.red('   @@@@@@@@@@@@@@@@@@@@@@@                  @@@@@@@@@@@@@@@@@@@@@@@   '),
        chalk.red('   @@@@@@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@@@@@@@@@   '),
        chalk.red('  @@@@@@@@@@@@@@@@@@@@@@@@@@@            @@@@@@@@@@@@@@@@@@@@@@@@@@@  '),
        chalk.red('  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@  '),
        chalk.red('  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@      @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  '),
        chalk.red('  @@@@@@@@@@@@@@@@@@@@@@@@@@@@          @@@@@@@@@@@@@@@@@@@@@@@@@@@@  '),
        chalk.red('   @@@@@@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@@@@@@@@@   '),
        chalk.red('   @@@@@@@@@@@@@@@@@@@@@@@                  @@@@@@@@@@@@@@@@@@@@@@@   '),
        chalk.red('   @@@@@@@@@@@@@@@@@@@@@@                    @@@@@@@@@@@@@@@@@@@@@@   '),
        chalk.red('    @@@@@@@@@@@@@@@@@@@                        @@@@@@@@@@@@@@@@@@@    '),
        chalk.red('     @@@@@@@@@@@@@@@@                            @@@@@@@@@@@@@@@@     '),
        chalk.red('     @@@@@@@@@@@@@@                                @@@@@@@@@@@@@@     '),
        chalk.red('      @@@@@@@@@@@@                                  @@@@@@@@@@@@      '),
        chalk.red('        @@@@@@@@@@@@@                             @@@@@@@@@@@@        '),
        chalk.red('         @@@@@@@@@@@@@@                       @@@@@@@@@@@@@@@         '),
        chalk.red('           @@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@           '),
        chalk.red('             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@             '),
        chalk.red('               @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@               '),
        chalk.red('                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                  '),
        chalk.red('                     @@@@@@@@@@@@@@@@@@@@@@@@@@@@                     '),
        chalk.red('                            @@@@@@@@@@@@@@                            '),
    ];

    /**
     * Play the cinematic startup sequence
     */
    static async playStartupSequence(): Promise<void> {
        console.clear();

        // Render logo line by line with fade-in effect
        for (const line of this.cinematicLogo) {
            console.log(line);
            await this.sleep(40); // Faster speed for better UX
        }

        await this.sleep(300);

        // Display ASCII art title
        console.log('');
        console.log(chalk.red('                    ██████╗ █████╗ ██████╗ ███╗   ██╗██╗████████╗██████╗ ██╗██╗  ██╗'));
        console.log(chalk.red('                   ██╔════╝██╔══██╗██╔══██╗████╗  ██║██║╚══██╔══╝██╔══██╗██║╚██╗██╔╝'));
        console.log(chalk.red('                   ██║     ███████║██████╔╝██╔██╗ ██║██║   ██║   ██████╔╝██║ ╚███╔╝ '));
        console.log(chalk.red('                   ██║     ██╔══██║██╔══██╗██║╚██╗██║██║   ██║   ██╔══██╗██║ ██╔██╗ '));
        console.log(chalk.red('                   ╚██████╗██║  ██║██║  ██║██║ ╚████║██║   ██║   ██║  ██║██║██╔╝ ██╗'));
        console.log(chalk.red('                    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝'));
        console.log('');
        console.log(chalk.white('                                    ╔════════════════════════╗'));
        console.log(chalk.white('                                    ║   AI CODE GUARDIAN    ║'));
        console.log(chalk.white('                                    ║  Intelligence Engine  ║'));
        console.log(chalk.white('                                    ╚════════════════════════╝'));
        console.log('');
        console.log(chalk.dim('                                    > Awaiting command, Commander.'));
        console.log('');

        await this.sleep(500);
    }

    /**
     * Pulse animation for dramatic effect
     */
    static async pulse(text: string, times: number = 3): Promise<void> {
        for (let i = 0; i < times; i++) {
            process.stdout.write('\r' + chalk.redBright(text));
            await this.sleep(300);
            process.stdout.write('\r' + chalk.red(text));
            await this.sleep(300);
        }
        console.log('');
    }

    /**
     * Progress bar animation
     */
    static async progressBar(label: string, duration: number = 2000): Promise<void> {
        const barLength = 30;
        const steps = 20;
        const stepDuration = duration / steps;

        for (let i = 0; i <= steps; i++) {
            const filled = Math.floor((i / steps) * barLength);
            const empty = barLength - filled;
            const bar = chalk.red('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
            const percent = Math.floor((i / steps) * 100);
            process.stdout.write(`\r${label} [${bar}] ${percent}%`);
            await this.sleep(stepDuration);
        }
        console.log('');
    }

    /**
     * Dramatic reveal effect
     */
    static async reveal(lines: string[], delay: number = 100): Promise<void> {
        for (const line of lines) {
            console.log(line);
            await this.sleep(delay);
        }
    }
}
