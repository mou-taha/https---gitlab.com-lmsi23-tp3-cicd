const request = require("supertest");
const app = require("./server");

const agent = request.agent(app);

test("It should calculate pricing correctly", async () => {
  const res = await agent
    .post("/api/pricing")
    .send({ plan: "standard", quantity: 2 });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toMatchObject({ price: 20, vat: 4, totalPrice: 24 });
});
test("It should return error for invalid parameters", async () => {
  const res = await agent
    .post("/api/pricing")
    .send({ plan: "invalid", quantity: 2 });
  expect(res.statusCode).toEqual(400);
});
afterAll((done) => {
  app.close();
  done();
});
