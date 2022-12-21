import supertest from "supertest";
import app from "../index";

const request = supertest(app);

describe("test main endpoint ", () => {
  it("get the main end point", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
