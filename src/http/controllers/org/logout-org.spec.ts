import { app } from "@/app";
import { criarEAutenticarNovoUsuario } from "@/utils/tests/criar-e-autenticar-novo-usuario";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Logout (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve deslogar o usuário", async () => {
    const { token } = await criarEAutenticarNovoUsuario(app);

    const response = await request(app.server)
      .get("/org/logout")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.get("Set-Cookie")).toEqual([expect.stringContaining("refreshToken=;")]);
  });
});
