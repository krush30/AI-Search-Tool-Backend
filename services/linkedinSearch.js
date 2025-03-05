const axios = require("axios");

const scrapeLinkedIn = async (query) => {
    try {
        const apiKey = process.env.SERPAPI_KEY;
        const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=linkedin&api_key=${apiKey}`;

        const { data } = await axios.get(url);

        // Extract results
        const results = data.jobs_results?.map(result => ({
            source: "LinkedIn",
            title: result.title,
            link: result.link
        })) || [];

        return results;
    } catch (error) {
        console.error("LinkedIn Scraper Error:", error);
        return [];
    }
};

module.exports = { scrapeLinkedIn };
