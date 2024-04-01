import { IPet } from "@/@types/pet";
import { makeBuscarPetsPorCaracteristicasService } from "@/services/factories/make-buscar-pets-por-caracteristicas";
import { Ambiente, Energia, Idade, Independencia, Porte } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function buscarPetsPorCidadeController(req: FastifyRequest, res: FastifyReply) {
  const querySchema = z.object({
    cidade: z.coerce.number(),
    idade: z.enum([Idade.ADULTO, Idade.FILHOTE, Idade.SENIOR]).optional(),
    porte: z.enum([Porte.GRANDE, Porte.MEDIO, Porte.PEQUENO]).optional(),
    energia: z.enum([Energia.ALTA, Energia.BAIXA, Energia.MEDIA]).optional(),
    independencia: z
      .enum([Independencia.ALTO, Independencia.BAIXO, Independencia.MEDIO])
      .optional(),
    ambiente: z.enum([Ambiente.AMPLO, Ambiente.MEDIO, Ambiente.PEQUENO]).optional(),
  });
  const { cidade, ambiente, energia, idade, independencia, porte } = querySchema.parse(req.query);

  try {
    const buscarService = makeBuscarPetsPorCaracteristicasService();
    const { pets } = await buscarService.execute({
      caracteristicas: {
        ambiente: ambiente ? [ambiente] : null,
        energia: energia ? [energia] : null,
        idade: idade ? [idade] : null,
        independencia: independencia ? [independencia] : null,
        porte: porte ? [porte] : null,
      },
      cidade,
    });
    const response: IPet[] = pets.map((pet) => ({
      nome: pet.nome,
      ambiente: pet.ambiente,
      energia: pet.energia,
      idade: pet.idade,
      independencia: pet.independencia,
      porte: pet.porte,
      requisitos: pet.requisitos,
      sobre: pet.sobre,
    }));

    return res.status(200).send({ pets: response });
  } catch (error) {
    throw error;
  }
}
