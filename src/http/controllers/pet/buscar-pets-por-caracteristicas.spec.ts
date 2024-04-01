import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Buscar pets por caracteristicas (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve buscar todos os pets de uma cidade por caracteristicas", async () => {
    await prisma.uf.createMany({
      data: [
        {
          uf: "SP",
          id: 1,
        },
        {
          uf: "RS",
          id: 2,
        },
      ],
    });

    await prisma.localizacao.createMany({
      data: [
        {
          cidade: "São Paulo",
          uf: "SP",
          id: 1,
        },
        {
          cidade: "Porto Alegre",
          uf: "RS",
          id: 2,
        },
      ],
    });

    await prisma.org.createMany({
      data: [
        {
          cep: "01001000",
          email: "jhondoe@example.com",
          endereco: "Teste 123",
          localizacao_id: 1,
          password_hash: await hash("Teste12", 6),
          responsavel: "Jhon Doe",
          whatsapp: "11999999999",
          id: "1",
        },
        {
          cep: "91360210",
          email: "jhondoe2@example.com",
          endereco: "Teste 123",
          localizacao_id: 2,
          password_hash: await hash("Teste12", 6),
          responsavel: "Jhon Doe",
          whatsapp: "11999999999",
          id: "2",
        },
      ],
    });
    await prisma.pet.createMany({
      data: [
        {
          nome: "Rex",
          sobre: "Um cachorro muito brincalhão",
          idade: "ADULTO",
          porte: "MEDIO",
          energia: "ALTA",
          independencia: "MEDIO",
          ambiente: "MEDIO",
          requisitos: "precisa de espaço",
          org_id: "1",
        },
        {
          nome: "Toby",
          sobre: "Um cachorro muito querido",
          idade: "ADULTO",
          porte: "PEQUENO",
          energia: "BAIXA",
          independencia: "ALTO",
          ambiente: "PEQUENO",
          requisitos: "precisa de carinho",
          org_id: "1",
        },
        {
          nome: "Luna",
          sobre: "Uma cachorra muito carinhosa",
          idade: "FILHOTE",
          porte: "GRANDE",
          energia: "MEDIA",
          independencia: "MEDIO",
          ambiente: "AMPLO",
          requisitos: "precisa de atenção",
          org_id: "1",
        },
      ],
    });

    const { statusCode, body } = await request(app.server)
      .get("/pets/buscar/1/caracteristicas?idade=ADULTO&porte=PEQUENO")
      .send();
    expect(statusCode).toBe(200);
    expect(body.pets).toHaveLength(1);
    expect(body.pets).toEqual(expect.arrayContaining([expect.objectContaining({ nome: "Toby" })]));
  });
});
