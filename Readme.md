# AI-Powered Search Aggregator - Backend

This is the backend for an AI-powered search aggregation tool that fetches results from multiple sources (Google, YouTube) and processes them with AI. The backend is built with **Node.js, Express, PostgreSQL, and Drizzle ORM**.

## Features

- Fetches search results from Google, YouTube using **SerpAPI**.
- Processes results using **Gemini** for intelligent summarization.
- Stores search results in a **PostgreSQL database**.
- Provides a REST API for the frontend to fetch processed results.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **APIs Used**: SerpAPI (Google, YouTube), Gemini

## Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- PostgreSQL (Ensure a running instance)
- An account with **SerpAPI** and **Gemini** (for API keys)

## Installation

### 1. Clone the repository

```sh
git clone https://github.com/your-repo.git
cd backend
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
GEMINI_API_KEY=AIzaSyAX3gcBkqZvFQLWBg_YMfpcC5qCcI4CzbU
PORT=5000
DATABASE_URL=postgresql://postgres:123123@localhost:5432/postgres
SERPAPI_KEY=0d1df339b3771e6a6357780bbe247b34cdb1ad7cf80820e53b33c46181942f71
```

### 4. Set up the Database

Run the following command to apply migrations also please install drizzle-kit:

```sh
npx drizzle-kit generate
npx drizzle-kit push

```

### 5. Start the Server

```sh
npm start
```

The backend will run at `http://localhost:5000`

## API Endpoints

### 1. Search Query (Aggregates Google, YouTube, and LinkedIn results), Give below search query for postman if u want.

```http
GET http://localhost:5000/api/search?query=New%20Games%20
```

#### Response:

```json
{
  "results": [
    {
      "source": "Google",
      "title": "Example Title",
      "link": "https://example.com"
    },
    {
      "source": "YouTube",
      "title": "Example Video",
      "link": "https://youtube.com/watch?v=xyz"
    }
  ]
}
```

## Project Structure

```
backend/
│── models/
│   ├── db.js              # Database connection
│   ├── searchResults.js   # Search results model
│── routes/
│   ├── search.js          # Search route
│── services/
│   ├── googleSearch.js    # Google scraping service
│   ├── youtubeSearch.js   # YouTube scraping service
│   ├── linkedinSearch.js  # LinkedIn scraping service
│   ├── openaiSearch.js    # AI processing service
│── .env                   # Environment variables
│── index.js              # Main Express server
│── package.json           # Dependencies
```

## Troubleshooting

- If YouTube results return an **empty array**, ensure your **SERPAPI_KEY** is valid and has YouTube access.
- If the database connection fails, check that **PostgreSQL** is running and the credentials in `.env` are correct.

## Future Enhancements

- Add more search sources (e.g., Twitter, Reddit).
- Implement caching to reduce API calls.
- Introduce user authentication for personalized searches.
