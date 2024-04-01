import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve atualizar o token", async () => {
    await request(app.server).post("/org").send({
      responsavel: "Jhon Doe",
      email: "jhondoe@example.com",
      cep: "01001-000",
      endereco: "Rua Augusta, 123",
      whatsapp: "11999999999",
      password: "Teste12",
    });

    const authResponse = await request(app.server).post("/org/auth").send({
      email: "jhondoe@example.com",
      password: "Teste12",
    });

    const cookies = authResponse.get("Set-Cookie") ?? [];
    const response = await request(app.server)
      .patch("/org/auth/refresh-token")
      .set("Cookie", cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([expect.stringContaining("refreshToken=")]);
  });
});
