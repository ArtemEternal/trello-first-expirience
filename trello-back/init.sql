CREATE TABLE cards (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    text VARCHAR(255),
    background VARCHAR(500) NOT NULL
);

CREATE TABLE tables (
    id VARCHAR(50) PRIMARY KEY,
    card_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

CREATE TABLE table_cards (
    id VARCHAR(50) PRIMARY KEY,
    table_id VARCHAR(50) NOT NULL,
    text VARCHAR(255) NOT NULL,
    FOREIGN KEY (table_id) REFERENCES tables(id) ON DELETE CASCADE
);