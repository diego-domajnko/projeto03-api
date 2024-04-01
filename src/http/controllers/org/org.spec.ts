import request from "supertest";
import { app } from "@/app";
import { criarEAutenticarNovoUsuario } from "@/utils/tests/criar-e-autenticar-novo-usuario";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Buscar organização (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve buscar e validar a organização", async () => {
    const { token } = await criarEAutenticarNovoUsuario(app);

    const response = await request(app.server)
      .get("/org")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ email: "jhondoe@example.com" }));
  });
});
