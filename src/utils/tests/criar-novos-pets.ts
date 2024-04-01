import request from "supertest";
import { FastifyInstance } from "fastify";

export async function criarNovosPets(app: FastifyInstance, token: string) {
  await Promise.all([
    request(app.server)
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
      }),
    request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Toby",
        sobre: "Um cachorro muito querido",
        idade: "SENIOR",
        porte: "PEQUENO",
        energia: "BAIXA",
        independencia: "ALTO",
        ambiente: "PEQUENO",
        requisitos: ["precisa de carinho"],
      }),
    request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        nome: "Luna",
        sobre: "Uma cachorra muito carinhosa",
        idade: "FILHOTE",
        porte: "GRANDE",
        energia: "MEDIA",
        independencia: "MEDIO",
        ambiente: "AMPLO",
        requisitos: ["precisa de atenção"],
      }),
  ]);
}
