import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiProvider {
    constructor(apiKey, modelName = "gemini-1.5-flash") {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.modelName = modelName;
        this.model = this.genAI.getGenerativeModel({ model: modelName });
    }

    async generate(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (err) {
            if (err.message.includes('404')) {
                console.warn(`⚠️ Model "${this.modelName}" not found. Trying fallback...`);

                const fallbacks = ["gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
                for (const modelName of fallbacks) {
                    try {
                        console.log(`🔄 Trying ${modelName}...`);
                        const fallbackModel = this.genAI.getGenerativeModel({ model: modelName });
                        const result = await fallbackModel.generateContent(prompt);
                        const response = await result.response;
                        return response.text();
                    } catch (retryErr) {
                        if (retryErr.message.includes('404')) continue;
                        throw retryErr;
                    }
                }
            }
            throw err;
        }
    }
}

export default GeminiProvider;
