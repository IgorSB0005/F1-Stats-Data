CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    favorite_team VARCHAR(100)
);

CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    source_url TEXT,
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    tags VARCHAR(50)[]
);

CREATE TABLE IF NOT EXISTS driver_standings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    position INTEGER NOT NULL,
    driver_name VARCHAR(255) NOT NULL,
    constructor VARCHAR(255) NOT NULL,
    points FLOAT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS race_calendar (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    official_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    country VARCHAR(255),
    date_start TIMESTAMP,
    date_end TIMESTAMP,
    track_image TEXT,
    country_flag TEXT
);