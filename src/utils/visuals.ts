import chalk from 'chalk';

export class Visuals {
    private static watchFrames = [
        `
           ${chalk.red('.▅▆▇████████▇▆▅.')}
        ${chalk.red('.████████████████████.')}
      ${chalk.red('.███████▀▀        ▀▀███████.')}
     ${chalk.red('.█████▀                ▀█████.')}
    ${chalk.red('.████▀     ▄▄▄    ▄▄▄     ▀████.')}
    ${chalk.red('████      ████    ████      ████')}
    ${chalk.red('████      ████    ████      ████')}
    ${chalk.red('████       ▀██▄  ▄██▀       ████')}
    ${chalk.red('████         ▀████▀         ████')}
    ${chalk.red('████         ▄████▄         ████')}
    ${chalk.red('████       ▄██▀  ▀██▄       ████')}
    ${chalk.red('████      ████    ████      ████')}
    ${chalk.red('████      ████    ████      ████')}
    ${chalk.red('.████▄     ▀▀▀    ▀▀▀     ▄████.')}
     ${chalk.red('.█████▄                ▄█████.')}
      ${chalk.red('.███████▄▄        ▄▄███████.')}
        ${chalk.red('.████████████████████.')}
           ${chalk.red('.▀▅▆▇████████▇▆▅.')}
    `,
        `
           ${chalk.redBright('.▅▆▇████████▇▆▅.')}
        ${chalk.redBright('.████████████████████.')}
      ${chalk.redBright('.███████▀▀        ▀▀███████.')}
     ${chalk.redBright('.█████▀                ▀█████.')}
    ${chalk.redBright('.████▀     ▄▄▄    ▄▄▄     ▀████.')}
    ${chalk.redBright('████      ████    ████      ████')}
    ${chalk.redBright('████      ')}${chalk.white('████')}${chalk.redBright('    ')}${chalk.white('████')}${chalk.redBright('      ████')}
    ${chalk.redBright('████       ▀██▄  ▄██▀       ████')}
    ${chalk.redBright('████         ▀████▀         ████')}
    ${chalk.redBright('████         ▄████▄         ████')}
    ${chalk.redBright('████       ▄██▀  ▀██▄       ████')}
    ${chalk.redBright('████      ')}${chalk.white('████')}${chalk.redBright('    ')}${chalk.white('████')}${chalk.redBright('      ████')}
    ${chalk.redBright('████      ████    ████      ████')}
    ${chalk.redBright('.████▄     ▀▀▀    ▀▀▀     ▄████.')}
     ${chalk.redBright('.█████▄                ▄█████.')}
      ${chalk.redBright('.███████▄▄        ▄▄███████.')}
        ${chalk.redBright('.████████████████████.')}
           ${chalk.redBright('.▀▅▆▇████████▇▆▅.')}
    `
    ];

    static async playIntro() {
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        console.clear();
        // Play watch pulse / reveal
        for (let i = 0; i < 6; i++) {
            const frame = this.watchFrames[i % this.watchFrames.length];
            process.stdout.write('\x1b[H' + frame + '\n' + chalk.red.bold('         [ CARNITRIX SYSTEM INITIALIZING ]'));
            await sleep(150);
        }

        await sleep(300);
        console.clear();
    }

    static getStaticLogo() {
        // Slightly more compact version of the watch face for static display
        return `
           ${chalk.red('.▅▆▇████████▇▆▅.')}
        ${chalk.red('.████████████████████.')}
      ${chalk.red('.███████▀▀        ▀▀███████.')}
     ${chalk.red('.█████▀                ▀█████.')}
    ${chalk.red('.████▀     ▄▄▄    ▄▄▄     ▀████.')}
    ${chalk.red('████      ████    ████      ████')}
    ${chalk.red('████       ▀██▄  ▄██▀       ████')}
    ${chalk.red('████         ▀████▀         ████')}
    ${chalk.red('████         ▄████▄         ████')}
    ${chalk.red('████       ▄██▀  ▀██▄       ████')}
    ${chalk.red('████      ████    ████      ████')}
    ${chalk.red('.████▄     ▀▀▀    ▀▀▀     ▄████.')}
     ${chalk.red('.█████▄                ▄█████.')}
      ${chalk.red('.███████▄▄        ▄▄███████.')}
           ${chalk.red('.▀▅▆▇████████▇▆▅.')}

    ${chalk.red.bold('        C A R N I T R I X - A I')}
    ${chalk.red('     [ Code Evolution Intelligence ]')}
    `;
    }

    static getWatchIcon() {
        return chalk.red('☢');
    }
}
