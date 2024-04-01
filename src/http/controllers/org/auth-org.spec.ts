import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Autenticar organização (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve autenticar uma organização ao realizar o login", async () => {
    await request(app.server).post("/org").send({
      responsavel: "Jhon Doe",
      email: "jhondoe@example.com",
      cep: "01001-000",
      endereco: "Rua Augusta, 123",
      whatsapp: "11999999999",
      password: "Teste12",
    });

    const response = await request(app.server).post("/org/auth").send({
      email: "jhondoe@example.com",
      password: "Teste12",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }));
  });
});
