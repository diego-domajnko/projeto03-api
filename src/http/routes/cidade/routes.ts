import { buscarTodasCidades } from "@/http/controllers/cidade/buscar-todas-cidades";
import { FastifyInstance } from "fastify";

export async function cidadesRoutes(app: FastifyInstance) {
  app.get("/all", buscarTodasCidades);
}
