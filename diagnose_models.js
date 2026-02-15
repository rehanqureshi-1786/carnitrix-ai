import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
    console.error("No API key found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function list() {
    try {
        const result = await genAI.listModels();
        console.log("Available Models:");
        result.models.forEach(m => console.log(`- ${m.name}`));
    } catch (err) {
        console.error("Error listing models:", err.message);
    }
}

list();
