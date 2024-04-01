import { FastifyInstance } from "fastify";
import { criarEAutenticarNovoUsuario } from "./criar-e-autenticar-novo-usuario";

export async function criarVariasOrganizacoes(app: FastifyInstance) {
  await criarEAutenticarNovoUsuario(app);
  await criarEAutenticarNovoUsuario(app, "jhondoe1@example.com", "91360-210");
  await criarEAutenticarNovoUsuario(app, "jhondoe2@example.com", "92010-973");
  await criarEAutenticarNovoUsuario(app, "jhondoe3@example.com", "20750-000");
  await criarEAutenticarNovoUsuario(app, "jhondoe4@example.com", "30260-656");
}
