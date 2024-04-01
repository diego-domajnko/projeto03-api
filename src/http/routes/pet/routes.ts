import { buscarPetPorIdController } from "@/http/controllers/pet/buscar-pet-por-id";
import { buscarPetsPorCidadeController } from "@/http/controllers/pet/buscar-pets-por-cidade";
import { criarPetController } from "@/http/controllers/pet/criar-pet";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function petRoutes(app: FastifyInstance) {
  app.post("/", { onRequest: [verifyJwt] }, criarPetController);
  app.get("/:id", buscarPetPorIdController);
  app.get("/buscar", buscarPetsPorCidadeController);
}
