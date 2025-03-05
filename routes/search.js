const express = require("express");
const db = require("../models/db");
const { searchResults } = require("../models/searchResults");
const { scrapeGoogle } = require("../services/googleSearch");
const { scrapeYouTube } = require("../services/youtubeSearch");
const { scrapeLinkedIn } = require("../services/linkedinSearch");
const { processWithAI } = require('../services/openaiSearch');

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { query } = req.query;
        // console.log(query);


        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        // Fetch data from multiple sources
        const [googleResults, youtubeResults, linkedinResults] = await Promise.all([
            scrapeGoogle(query),
            scrapeYouTube(query),
            // scrapeLinkedIn(query)
        ]);
        // console.log(googleResults);
        console.log("This is youtube", youtubeResults);
        // console.log(linkedinResults);

        // Process results with AI
        const processedResults = await processWithAI([
            ...googleResults,
            ...youtubeResults,
            // ...linkedinResults
        ]);

        // Store results in the database
        for (const result of processedResults) {
            await db.insert(searchResults).values({
                query,
                source: result.source,
                title: result.title,
                link: result.link
            });
        }

        res.json({ results: processedResults });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
