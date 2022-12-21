import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  PGHOST,
  PGPORT,
  PGDB,
  PGDBTEST,
  PGUSER,
  PGPASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
  NODE_ENV,
} = process.env;
export default {
  port: PORT,
  host: PGHOST,
  dbPort: PGPORT,
  database: NODE_ENV === "dev" ? PGDB : PGDBTEST,
  user: PGUSER,
  password: PGPASSWORD,
  bcryptPass: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  token: TOKEN_SECRET,
  typeOfDatabase: NODE_ENV,
};
