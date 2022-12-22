# Store Backend Api

A store backend API is a server-side application that provides a set of APIs for managing a store's data and business logic. The API supports CRUD (create, read, update, delete) operations on users, products, and orders, and also supports JWT (JSON Web Token) authentication for secure communication between the API and its clients.

## Getting Started

### Prerequisites

- Node.js: Follow the instructions at [nodejs.org](https://nodejs.org/en/) to install Node.js on your machine.
- PostgreSQL: Follow the instructions at [postgresql.org](https://www.postgresql.org/download/) to install PostgreSQL on your machine.

### Installing

- Clone the repository to your local machine:

```bash
 https://github.com/yousefwahba/store-api.git
```

- Install the dependencies:

```bash
  npm install
```

### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
PORT=3000
NODE_ENV=dev
#database
PGHOST=localhost
PGPORT=5432
PGDB=store_dev
PGDBTEST=store_test
PGUSER=postgres
PGPASSWORD=postgres
#hash
BCRYPT_PASSWORD=my-secret-pass
SALT_ROUNDS=10
TOKEN_SECRET=my-secret-token
```

#### Create and set up databases:

Create two PostgreSQL databases called `store_dev` `store_test` for the project

then run that:

```bash
  npm run migrate-up
```

#### Start the development server:

```bash
  npm run dev
```

#### Transpiring typescript to javascript:

```bash
  npm run build
```

#### Running the tests

```bash
  npm run test
```

### end points

all below links start with `http://localhost:3000/api`

`GET /users`: returns a list of all users.
`GET /users/:id`: returns a single user by ID.
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

### Created With

- Node.js - JavaScript runtime for executing server-side code
- Express - Web framework for building APIs
- PostgreSQL - Relational database management system
- Jasmine - Testing framework for JavaScript
- TypeScript - Superset of JavaScript that adds optional static typing and class-based object-oriented programming
