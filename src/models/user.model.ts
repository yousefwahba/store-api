import User from "../types/user.type";
import db from "../database";
import config from "../config";
import bcrypt from "bcrypt";

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.bcryptPass}`, salt);
};

class UserModel {
  //get all users
  async getAll(): Promise<Array<User>> {
    try {
      const conn = await db.connect();
      const result = await conn.query("SELECT id,name,email FROM users");
      conn.release();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error("can't get all users");
    }
  }

  //get user by id
  async getById(id: number): Promise<User> {
    try {
      const conn = await db.connect();
      const result = await conn.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("can't get this user");
    }
  }

  //create user
  async create(user: User): Promise<User> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name,email",
        [user.name, user.email, hashPassword(user.password)]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't create this user");
    }
  }

  //update user
  async update(id: number, user: User): Promise<User> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id,name,email",
        [user.name, user.email, hashPassword(user.password), id]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't update this user");
    }
  }

  //delete user
  async delete(id: number): Promise<User> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "DELETE FROM users WHERE id = $1 RETURNING id,name,email",
        [id]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't delete this user");
    }
  }
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "SELECT password FROM users WHERE email=$1",
        [email]
      );
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(
          `${password}${config.bcryptPass}`,
          hashPassword
        );
        if (isPasswordValid) {
          const userInfo = await conn.query(
            "SELECT id,name,email FROM users WHERE email=($1)",
            [email]
          );
          return userInfo.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error("Unable to login");
    }
  }
}
export default UserModel;
