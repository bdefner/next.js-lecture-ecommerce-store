-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database

-- Create products table
CREATE TABLE products(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL,
  price integer NOT NULL
);


-- Insert some products (C in CRUD - Create)
INSERT INTO products
  (name, price)
VALUES
  ('cosy', 9.99),
  ('classy', 99.9),
  ('cool', 999),
  ('sunny', 9990);

-- Read some products (R in CRUD - Read)
SELECT * FROM products;
