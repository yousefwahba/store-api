import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("test first end point ", () => {
  it("get the main end point", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
