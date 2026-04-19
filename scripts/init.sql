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