import supertest from "supertest";
import db from "../../database";
import User from "../../types/user.type";
import app from "../../index";

const request = supertest(app);

describe("user routes", () => {
  let user: User;
  let token: string;

  beforeAll(async () => {
    user = {
      name: "test user",
      email: "test@gmail.com",
      password: "test123",
    } as User;
    const res = await request.post("/api/users").send(user);
    user.id = res.body.id;
    // console.log(res.body);
    const authRes = await request
      .post("/api/users/auth")
      .send({ email: user.email, password: user.password });
    const { token: userToken } = authRes.body.data;
    token = userToken;
  });
  afterAll(async () => {
    const conn = await db.connect();
    await conn.query(
      "DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;"
    );
    conn.release();
  });
  it("GET /users", async () => {
    const res = await request
      .get("/api/users/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
  it("POST /users", async () => {
    const newUser = {
      name: "new test user",
      email: "newtest@gmail.com",
      password: "test123",
    } as User;
    const res = await request.post("/api/users/").send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.email).toEqual(newUser.email);
  });
  it("PUT /users/:id", async () => {
    const updatedUser = {
      name: "updated test user",
      email: "test@gmail.com",
      password: "test123",
    } as User;
    const res = await request
      .put(`/api/users/${user.id}`)
      .send(updatedUser)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toEqual(updatedUser.email);
  });
  it("POST /users/auth ", async () => {
    const res = await request
      .post("/api/users/auth")
      .send({ email: user.email, password: user.password });
    expect(res.status).toBe(200);
  });
  it("DELETE /users/:id", async () => {
    const res = await request.delete(`/api/users/${user.id}`);
    expect(res.status).toBe(200);
  });
});
