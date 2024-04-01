import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Criar organização (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve criar uma organização nova", async () => {
    const org = await request(app.server).post("/org").send({
      responsavel: "Jhon Doe",
      email: "jhondoe@example.com",
      cep: "01001-000",
      endereco: "Rua Augusta, 123",
      whatsapp: "11999999999",
      password: "Teste12",
    });

    expect(org.statusCode).toBe(201);
  });
});
