DROP EXTENSION IF EXISTS "uuid-ossp";
CREATE EXTENSION "uuid-ossp";

CREATE TABLE IF NOT EXISTS blogify_authors (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    "displayName" VARCHAR(30) NOT NULL,
    "mappedIamId" VARCHAR(36),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogify_articles (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "createdBy" VARCHAR(36) REFERENCES blogify_authors (id),
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedBy" VARCHAR(36) REFERENCES blogify_authors (id),
    "title" VARCHAR (64) NOT NULL,
    "introduction" VARCHAR (128) NOT NULL,
    "content" TEXT NOT NULL,
);