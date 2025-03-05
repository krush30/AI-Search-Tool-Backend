const axios = require("axios");

const scrapeYouTube = async (query) => {
    try {
        const apiKey = process.env.SERPAPI_KEY;
        const url = `https://serpapi.com/search.json?engine=youtube&search_query=${encodeURIComponent(query)}&api_key=${apiKey}`;

        const { data } = await axios.get(url);

        console.log("YouTube API Response:", JSON.stringify(data, null, 2)); // Debugging

        if (!data.video_results || data.video_results.length === 0) {
            console.error("No video results found!");
            return [];
        }

        return data.video_results.map(result => ({
            source: "YouTube",
            title: result.title,
            link: result.link
        }));
    } catch (error) {
        console.error("YouTube Scraper Error:", error.response?.data || error.message);
        return [];
    }
};

module.exports = { scrapeYouTube };
