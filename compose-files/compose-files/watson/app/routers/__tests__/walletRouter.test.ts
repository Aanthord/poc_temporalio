import request from "supertest";
import { app } from "../../server";
import { connectDB, disconnectDB } from "../../db/mongo/mongo";
import { WalletModel } from "../../dbmodels/WalletModel";
import { PrivateKeyModel } from "../../dbmodels/PrivateKeyModel";

beforeAll(() => {
  connectDB();
});

afterAll(() => {
  disconnectDB();
});

beforeEach(async () => {
  await WalletModel.deleteMany({ _id: 1 });
  await PrivateKeyModel.deleteMany({ _id: 1 });
});

afterEach(async () => {
  await WalletModel.deleteMany({ _id: 1 });
  await PrivateKeyModel.deleteMany({ _id: 1 });
});

test("/POST wallet creation", async () => {
  const user = {
    user_id: 1,
  };

  const res = await request(app).post("/wallet").send(user);
  expect(res.body.ok).toEqual(true);
});

test("/GET wallet with no tokens", async () => {
  const user = {
    user_id: 1,
  };

  let res = await request(app).post("/wallet").send(user);
  const userRes = res.body;
  expect(userRes.ok).toEqual(true);

  res = await request(app)
    .get("/wallet/" + user.user_id)
    .send(user);
  // expect(res.ok).toEqual(true);
  expect(res.body.address).toEqual(userRes.data.address);
});
