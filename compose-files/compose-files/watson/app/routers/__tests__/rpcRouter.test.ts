import request from "supertest";
import { app } from "../../server";
import { connectDB, disconnectDB } from "../../db/mongo/mongo";
import { WalletModel } from "../../dbmodels/WalletModel";
import { PrivateKeyModel } from "../../dbmodels/PrivateKeyModel";

beforeAll(async () => {
  // create database connection
  connectDB();
  // deploy profile contract
  // await deployProfileToken();
});

afterAll(() => {
  disconnectDB();
});

beforeEach(async () => {
  await WalletModel.deleteMany({ _id: 1 });
});

afterEach(async () => {
  await WalletModel.deleteMany();
  await PrivateKeyModel.deleteMany();
});

test("/POST mint-growth-partner-profile", async () => {
  let user = {
    user_id: 1,
    growth_partner_uuid: "df23423r34",
    agency_id: 1,
    hash_value: "df23423r34",
    fow_specialties: ["cassandra", "javascript"],
  };

  const res1 = await request(app).post("/wallet").send(user);
  expect(res1.body.ok).toEqual(true);

  const res = await request(app).post("/mint-growth-partner-profile").send(user);

  expect(res.statusCode).toEqual(200);
});

test("/POST mint-growth-partner-profile 2", async () => {
  let user = {
    user_id: 3,
    growth_partner_uuid: "df23423r34",
    agency_id: 1,
    hash_value: "df23423r34",
    fow_specialties: ["cassandra", "javascript"],
  };
  const res1 = await request(app).post("/wallet").send(user);
  expect(res1.body.ok).toEqual(true);

  const res = await request(app).post("/mint-growth-partner-profile").send(user);

  expect(res.statusCode).toEqual(200);
});

test("/GET wallet with one tokens", async () => {
  let user = {
    user_id: 2,
    growth_partner_uuid: "df23423r34",
    agency_id: 1,
    hash_value: "df23423r34",
    fow_specialties: ["cassandra", "javascript"],
  };
  const res1 = await request(app).post("/wallet").send(user);
  expect(res1.body.ok).toEqual(true);

  const res = await request(app).post("/mint-growth-partner-profile").send(user);

  expect(res.statusCode).toEqual(200);
});
