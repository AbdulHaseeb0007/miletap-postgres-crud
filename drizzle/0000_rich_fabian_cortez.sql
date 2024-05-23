DO $$ BEGIN
 CREATE TYPE "public"."user_type" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"first_name" varchar(30) NOT NULL,
	"last_name" varchar(30) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"password" text NOT NULL,
	"birthday" date NOT NULL,
	"user_type" "user_type" DEFAULT 'user',
	"create_at" timestamp DEFAULT now(),
	"last_modified" timestamp DEFAULT now(),
	CONSTRAINT "accounts_email_unique" UNIQUE("email")
);
