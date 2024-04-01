import request from "supertest";
import { app } from "@/app";
import { criarEAutenticarNovoUsuario } from "@/utils/tests/criar-e-autenticar-novo-usuario";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Criar pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve criar um pet novo", async () => {
    const { token } = await criarEAutenticarNovoUsuario(app);

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Rex",
        sobre: "Um cachorro muito brincalhão",
        idade: "ADULTO",
        porte: "MEDIO",
        energia: "ALTA",
        independencia: "MEDIO",
        ambiente: "MEDIO",
        requisitos: ["precisa de espaço"],
      });

    expect(response.statusCode).toBe(201);
  });
});
