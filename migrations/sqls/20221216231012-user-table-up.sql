/* Replace with your SQL commands */
CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);