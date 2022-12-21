import UserModel from "../../models/user.model";
import db from "../../database";
import User from "../../types/user.type";

const userModel = new UserModel();
describe("user model", () => {
  describe("Test methods exist", () => {
    it("should have a getAll method", () => {
      expect(userModel.getAll).toBeDefined();
    });

    it("getById method", () => {
      expect(userModel.getById).toBeDefined();
    });

    it("create method", () => {
      expect(userModel.create).toBeDefined();
    });

    it("update method", () => {
      expect(userModel.update).toBeDefined();
    });

    it("delete method", () => {
      expect(userModel.delete).toBeDefined();
    });

    it("authenticate method", () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });
  //test logic
  describe("Test Model logic", () => {
    const user = {
      name: "yousof",
      email: "yousof@gmail.com",
      password: "test123",
    } as User;

    afterAll(async () => {
      const connection = await db.connect();
      await connection.query(
        "DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;"
      );
      connection.release();
    });
    it("create method", async () => {
      const createdUser = await userModel.create(user);
      expect(createdUser.email).toEqual(user.email);
    });
    it("return all users", async () => {
      const users = await userModel.getAll();
      expect(users.length).toBe(1);
    });
    it("get one user", async () => {
      const singleUser = await userModel.getById(1);
      expect(singleUser.name).toBe("yousof");
      expect(singleUser.email).toBe("yousof@gmail.com");
    });
    it("update user", async () => {
      const updatedUser = await userModel.update(1, {
        ...user,
        name: "yousef",
        email: "yousef@gmail.com",
      });
      expect(updatedUser.name).toBe("yousef");
      expect(updatedUser.email).toBe("yousef@gmail.com");
    });
    it("delete user", async () => {
      const deletedUser = await userModel.delete(1);
      expect(deletedUser.id).toBe(1);
    });
  }); //end test logic
});
