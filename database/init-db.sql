
CREATE TABLE IF NOT EXISTS brand (id SERIAL PRIMARY KEY, name VARCHAR(100));
CREATE TABLE IF NOT EXISTS category (id SERIAL PRIMARY KEY, name VARCHAR(100));
CREATE TABLE IF NOT EXISTS accessory (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255), 
    price NUMERIC(10, 2), 
    stock INTEGER, 
    type VARCHAR(50),
    brand_id INTEGER REFERENCES brand(id),
    category_id INTEGER REFERENCES category(id)
);

INSERT INTO brand (name) VALUES ('Apple'), ('Samsung');
INSERT INTO category (name) VALUES ('Coque'), ('Chargeur');
