const { pgTable, serial, text, timestamp } = require("drizzle-orm/pg-core");

// Define the table
const searchResults = pgTable("search_results", {
    id: serial("id").primaryKey(),
    query: text("query").notNull(),
    source: text("source").notNull(),
    title: text("title").notNull(),
    link: text("link").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { searchResults };  // Export as an object
