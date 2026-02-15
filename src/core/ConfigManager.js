import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

class ConfigManager {
    constructor(projectPath) {
        this.projectPath = projectPath;
        this.configPath = path.join(projectPath, '.actmrc');
        this.defaultConfig = {
            provider: 'local', // 'local' or 'google'
            model: 'Xenova/codegen-350M-mono',
            contextWindow: 5, // Number of related files to include
            autoSnapshot: true
        };
        this.config = this.loadConfig();
    }

    loadConfig() {
        if (fs.existsSync(this.configPath)) {
            try {
                const data = fs.readFileSync(this.configPath, 'utf-8');
                return { ...this.defaultConfig, ...JSON.parse(data) };
            } catch (err) {
                console.error('⚠️ Failed to parse .actmrc, using defaults.');
            }
        }
        return this.defaultConfig;
    }

    saveConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
    }

    get(key) {
        return this.config[key];
    }

    getApiKey(provider) {
        const envKey = `${provider.toUpperCase()}_API_KEY`;
        return process.env[envKey];
    }
}

export default ConfigManager;
