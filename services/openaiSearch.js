const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const processWithAI = async (results) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        if (!results || results.length === 0) {
            console.error("No search results available for AI processing.");
            return [];
        }

        const prompt = `
        Summarize and rank the following search results. Return ONLY a JSON array with the following format:
        [
          { "source": "Forbes", "title": "10 AI Predictions For 2025", "link": "https://example.com/ai-2025" },
          { "source": "MIT Technology Review", "title": "What's next for AI in 2025", "link": "https://example.com/ai-future" }
        ]
        No explanations, just the JSON array. Results:\n${JSON.stringify(results, null, 2)}
        `;

        // console.log("Sending prompt to Gemini:", prompt);

        const response = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });

        if (!response.response || !response.response.candidates || response.response.candidates.length === 0) {
            throw new Error("Invalid API response: No candidates returned.");
        }

        let textResponse = response.response.candidates[0]?.content?.parts?.[0]?.text || "[]";

        // Remove markdown code blocks (```json and ```)
        const cleanText = textResponse.replace(/```json|```/g, "").trim();

        // console.log("Cleaned AI Response:", cleanText);

        let structuredResults;
        try {
            structuredResults = JSON.parse(cleanText);
        } catch (error) {
            console.error("Error parsing AI response:", error);
            return [];
        }

        return structuredResults;

    } catch (error) {
        console.error("Gemini API Error:", error.message || error);
        return [];
    }
};

module.exports = { processWithAI };
