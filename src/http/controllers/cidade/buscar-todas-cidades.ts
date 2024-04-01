import { makeBuscarTodasCidadesService } from "@/services/factories/make-buscar-todas-cidaeds";
import { FastifyReply, FastifyRequest } from "fastify";

export async function buscarTodasCidades(_: FastifyRequest, res: FastifyReply) {
  try {
    const buscarCidadesService = makeBuscarTodasCidadesService();
    const { cidades } = await buscarCidadesService.execute();
    return res.status(200).send({ cidades });
  } catch (error) {
    throw error;
  }
}
