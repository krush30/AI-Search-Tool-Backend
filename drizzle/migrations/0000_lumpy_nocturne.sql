CREATE TABLE "search_results" (
	"id" serial PRIMARY KEY NOT NULL,
	"query" text NOT NULL,
	"source" text NOT NULL,
	"title" text NOT NULL,
	"link" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
