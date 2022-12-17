/* Replace with your SQL commands */
CREATE TABLE products (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT
);