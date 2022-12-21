"use strict";
// import UserModel from "../user.model";
// import db from "../../database";
// import User from "../../types/user.type";
// const userModel = new UserModel();
// describe("Authentication Module", () => {
//   describe("test methods is exists", () => {
//     it("authenticate method", () => {
//       expect(userModel.authenticate).toBeDefined();
//     });
//   });
//   describe("test auth logic", async () => {
//     const testUser: User = {
//       name: "yousof",
//       email: "yousof@gmail.com",
//       password: "test123",
//     };
//     beforeAll(async () => {
//       await userModel.create(testUser);
//     });
//     afterAll(async () => {
//       const conn = await db.connect();
//       await conn.query(
//         "DELETE FROM users; \n ALTER SEQUENCE users_id_seq RESTART WITH 1"
//       );
//       conn.release();
//     });
//   });
// });
