import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
    console.error("No API key found.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listAllModels() {
    console.log("Fetching authorized models from Google...");
    try {
        // In the newer SDKs, listModels might be on the genAI object or requires a specific client.
        // Let's try to find it. 
        if (typeof genAI.listModels === 'function') {
            const result = await genAI.listModels();
            console.log("Authorized models:", result.models.map(m => m.name));
        } else {
            console.log("genAI.listModels is not a function. Trying alternative discovery...");
            // Some versions might not have it directly.
        }
    } catch (err) {
        console.error("Failed to list models:", err.message);
    }
}

listAllModels();
