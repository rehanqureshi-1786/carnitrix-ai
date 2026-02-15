import { GoogleGenerativeAI } from "@google/generative-ai";
import chalk from "chalk";

export class GeminiProvider {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(apiKey: string, modelName: string = "gemini-2.5-flash") {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: modelName });
    }

    async generate(prompt: string): Promise<string> {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (err: any) {
            const errStr = err.toString() || err.message || "";
            if (errStr.includes('404') || errStr.toLowerCase().includes('not found')) {
                process.stdout.write(chalk.yellow(`\n⚠️ Model "${this.model.model}" not found. Trying fallbacks...\n`));
                const fallbacks = ["gemini-2.5-flash-latest", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
                for (const fallbackName of fallbacks) {
                    try {
                        process.stdout.write(chalk.dim(`🔄 Trying ${fallbackName}...\n`));
                        const fallbackModel = this.genAI.getGenerativeModel({ model: fallbackName });
                        const result = await fallbackModel.generateContent(prompt);
                        const response = await result.response;
                        return response.text();
                    } catch (retryErr: any) {
                        const retryErrStr = retryErr.toString() || retryErr.message || "";
                        if (retryErrStr.includes('404') || retryErrStr.toLowerCase().includes('not found')) continue;
                        throw retryErr;
                    }
                }
            }
            console.error(chalk.red('\nAI Provider Error:'), err.message || err);
            throw err;
        }
    }
}
