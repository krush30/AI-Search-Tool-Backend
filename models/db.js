const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
require("dotenv").config();

// Check if SSL is required (Render sometimes doesn't need it)
const isSSLRequired = process.env.DATABASE_URL.includes("render.com");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isSSLRequired ? { rejectUnauthorized: false } : false,
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
