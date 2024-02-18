CREATE SCHEMA "universal-app";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "universal-app"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"first_name" varchar(64) NOT NULL,
	"last_name" varchar(64) NOT NULL
);
