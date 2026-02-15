// COMPLEX CODE EXAMPLE - FOR AI FIX DEMONSTRATION
// This file demonstrates code that can be improved with AI refactoring

export class ComplexProcessor {
    private data: any[];
    private config: any;
    private cache: Map<string, any>;

    constructor(data: any[], config: any) {
        this.data = data;
        this.config = config;
        this.cache = new Map();
    }

    // Complex method with multiple responsibilities
    processData(input: string): any {
        // Validation
        if (!input || input.length === 0) {
            throw new Error('Invalid input');
        }
        if (input.length > 100) {
            throw new Error('Input too long');
        }
        if (!/^[a-zA-Z0-9]+$/.test(input)) {
            throw new Error('Invalid characters');
        }

        // Check cache
        if (this.cache.has(input)) {
            return this.cache.get(input);
        }

        // Process data
        let result = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].name === input) {
                let processed = {
                    id: this.data[i].id,
                    name: this.data[i].name.toUpperCase(),
                    value: this.data[i].value * 2,
                    timestamp: new Date().toISOString()
                };
                result.push(processed);
            }
        }

        // Apply config
        if (this.config.filter) {
            result = result.filter(item => item.value > this.config.filter);
        }
        if (this.config.sort) {
            result.sort((a, b) => {
                if (this.config.sort === 'asc') {
                    return a.value - b.value;
                } else {
                    return b.value - a.value;
                }
            });
        }

        // Cache result
        this.cache.set(input, result);
        return result;
    }

    // Deeply nested code
    findNestedData(key: string): any {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].items) {
                for (let j = 0; j < this.data[i].items.length; j++) {
                    if (this.data[i].items[j].subItems) {
                        for (let k = 0; k < this.data[i].items[j].subItems.length; k++) {
                            if (this.data[i].items[j].subItems[k].key === key) {
                                return this.data[i].items[j].subItems[k];
                            }
                        }
                    }
                }
            }
        }
        return null;
    }
}

