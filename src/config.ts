import dotenv from "dotenv";
dotenv.config();

const { PORT, PGHOST, PGPORT, PGDB, PGUSER, PGPASSWORD } = process.env;
export default {
  port: PORT,
  host: PGHOST,
  dbPort: PGPORT,
  database: PGDB,
  user: PGUSER,
  password: PGPASSWORD,
};
