const { defineConfig } = require('drizzle-kit');
const dotenv = require('dotenv');
dotenv.config();
module.exports = defineConfig({
  out: './drizzle/migrations',
  schema: './models/searchResults.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
