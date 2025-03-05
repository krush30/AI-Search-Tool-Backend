const axios = require("axios");

const scrapeGoogle = async (query) => {
    try {
        const apiKey = process.env.SERPAPI_KEY;
        const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}`;

        const { data } = await axios.get(url);

        // Extract results
        const results = data.organic_results.map(result => ({
            source: "Google",
            title: result.title,
            link: result.link
        }));

        return results;
    } catch (error) {
        console.error("Google Scraper Error:", error);
        return [];
    }
};

module.exports = { scrapeGoogle };
