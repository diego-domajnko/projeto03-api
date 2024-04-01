import { FastifyInstance } from "fastify";
import request from "supertest";

export async function criarEAutenticarNovoUsuario(
  app: FastifyInstance,
  email: string = "jhondoe@example.com",
  cep: string = "01001-000"
) {
  await request(app.server).post("/org").send({
    responsavel: "Jhon Doe",
    email,
    cep,
    endereco: "Rua Augusta, 123",
    whatsapp: "11999999999",
    password: "Teste12",
  });

  const { body } = await request(app.server).post("/org/auth").send({
    email: "jhondoe@example.com",
    password: "Teste12",
  });

  const { token } = body;

  return { token };
}
