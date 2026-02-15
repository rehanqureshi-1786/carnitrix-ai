import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
    console.error("No API key found.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).listModels();
        // Wait, listModels is on the genAI object sometimes, or requires an authenticated request.
        // The SDK might have changed. Let's try the direct listModels if available or just try a few known ones.
        console.log("Checking model availability...");
        const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];
        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                await model.generateContent("test");
                console.log(`✅ ${m} is available.`);
            } catch (e: any) {
                console.log(`❌ ${m} failed: ${e.message}`);
            }
        }
    } catch (err: any) {
        console.error("Error listing models:", err.message);
    }
}

listModels();
