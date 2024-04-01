import { IPet } from "@/@types/pet";
import { makeBuscarPetsPorCidadeService } from "@/services/factories/make-buscar-pets-por-cidade";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function buscarPetsPorCidadeController(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = z.object({
    cidade: z.coerce.number(),
  });
  const { cidade } = paramsSchema.parse(req.params);

  try {
    const buscarService = makeBuscarPetsPorCidadeService();
    const { pets } = await buscarService.execute({
      id_cidade: cidade,
    });
    const response: IPet[] = pets.map((pet) => ({
      id: pet.id,
      nome: pet.nome,
      ambiente: pet.ambiente,
      energia: pet.energia,
      idade: pet.idade,
      independencia: pet.independencia,
      porte: pet.porte,
      requisitos: pet.requisitos?.split(",") ?? null,
      sobre: pet.sobre,
    }));

    return res.status(200).send({ pets: response });
  } catch (error) {
    throw error;
  }
}
