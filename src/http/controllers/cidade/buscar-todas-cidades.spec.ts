import request from "supertest";
import { app } from "@/app";
import { criarEAutenticarNovoUsuario } from "@/utils/tests/criar-e-autenticar-novo-usuario";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { criarVariasOrganizacoes } from "@/utils/tests/criar-varias-organizacoes";

describe("Buscar cidades (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve buscar todas as cidades cadastradas", async () => {
    await criarVariasOrganizacoes(app);

    const response = await request(app.server).get("/cidades/all").send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        cidades: expect.arrayContaining([
          expect.objectContaining({ cidade: "São Paulo" }),
          expect.objectContaining({ cidade: "Porto Alegre" }),
          expect.objectContaining({ cidade: "Canoas" }),
          expect.objectContaining({ cidade: "Rio de Janeiro" }),
          expect.objectContaining({ cidade: "Belo Horizonte" }),
        ]),
      })
    );
  });
});
