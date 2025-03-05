const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
require("dotenv").config();
// Create a PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Ensure this is set in your .env file
});

// Initialize Drizzle ORM with PostgreSQL
const db = drizzle(pool);

(async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Database connected successfully!");
        client.release(); // Release connection back to pool
    } catch (error) {
        console.error("❌ Database connection failed:", error);
    }
})();

module.exports = db;
