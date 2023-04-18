-- Active: 1680695276342@@127.0.0.1@5432@postgres@public
CREATE TABLE "users" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255) UNIQUE,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
); 

INSERT INTO "users" ("email", "password") VALUES ('admin@mail.com', '1234');

INSERT INTO "users" ("email", "password") VALUES ('fazztrack@mail.com', '1234');

INSERT INTO "users" ("email", "password") VALUES ('bob@mail.com', '1234');

UPDATE "users" SET "email"='admin@gmail.com' WHERE "id" = 1;

DELETE FROM "users" *;
