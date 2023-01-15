/* Replace with your SQL commands */
CREATE TABLE orders (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL,
  total_price INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);