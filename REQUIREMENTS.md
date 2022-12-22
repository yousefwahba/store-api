# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# Api endpoints

all below links start with `http://localhost:3000/api`

`GET /users`: `required token` returns a list of all users.
`GET /users/:id`:`required token` returns a single user by ID.
`POST /users`: creates a new user with the data sent in the request body.
`PUT /users/:id`: updates an existing user with the data sent in the request body.
`DELETE /users/:id`: deletes an existing user by ID.
`POST /users/auth` : Check authentication (login)

`GET /products`: Returns a list of all products.
`GET /products/:id`: Returns a specific product with the given id.
`POST /products`: Creates a new product with the given data.
`PUT /products/:id`: Updates a specific product with the given id and data.
`DELETE /products/:id`: Deletes a specific product with the given id.

`GET /orders`: Returns a list of all orders.
`GET /orders/:id`: Returns a specific order with the given id.
`POST /orders`: Creates a new order with the given data.

## Database schema

### Users Schema

```sql
CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### Products Schema

```sql
CREATE TABLE products (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT
);
```

### Orders Schema

```sql
CREATE TABLE orders (
  id serial PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## Data Shapes

### User

```typescript
type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};
```

### Product

```typescript
type Product = {
  id?: number;
  name: string;
  price: number;
  description: string;
};
```

### Order

```typescript
type Order = {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
};
```
