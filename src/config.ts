import dotenv from "dotenv";
dotenv.config();

const {
  PORT,
  PGHOST,
  PGPORT,
  PGDB,
  PGUSER,
  PGPASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env;
export default {
  port: PORT,
  host: PGHOST,
  dbPort: PGPORT,
  database: PGDB,
  user: PGUSER,
  password: PGPASSWORD,
  bcryptPass: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
  token: TOKEN_SECRET,
};
