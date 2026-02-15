import fs from 'fs';
import path from 'path';

export class MemoryStore {
    private memoryPath: string;
    private data: any;

    constructor(projectPath: string) {
        this.memoryPath = path.join(projectPath, '.carnitrix.json');
        this.load();
    }

    private load() {
        if (fs.existsSync(this.memoryPath)) {
            this.data = JSON.parse(fs.readFileSync(this.memoryPath, 'utf-8'));
        } else {
            this.data = {
                preferredLanguage: 'typescript',
                frequentErrors: [],
                riskyFiles: [],
                lastScanScore: 0
            };
        }
    }

    save() {
        fs.writeFileSync(this.memoryPath, JSON.stringify(this.data, null, 2));
    }

    get(key: string) {
        return this.data[key];
    }

    set(key: string, value: any) {
        this.data[key] = value;
        this.save();
    }
}
