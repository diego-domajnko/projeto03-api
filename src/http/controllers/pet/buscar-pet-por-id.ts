import { IPet } from "@/@types/pet";
import { PetNaoEncontradoError } from "@/services/errors/pet-nao-encontrado-error";
import { makeBuscarOrgService } from "@/services/factories/make-buscar-org";
import { makeBuscarPetPorIdService } from "@/services/factories/make-buscar-pet-por-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function buscarPetPorIdController(req: FastifyRequest, res: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  });
  const { id } = paramsSchema.parse(req.params);

  try {
    const buscarPorIdService = makeBuscarPetPorIdService();
    const {
      pet: { ambiente, energia, idade, independencia, nome, porte, requisitos, sobre, org_id },
    } = await buscarPorIdService.execute({ id });

    const buscarOrgPorIdService = makeBuscarOrgService();
    const {
      org: { email, responsavel, whatsapp, endereco },
    } = await buscarOrgPorIdService.execute({ id: org_id });

    const response: IPet = {
      nome,
      ambiente,
      energia,
      idade,
      independencia,
      porte,
      requisitos,
      sobre,
      org: {
        email,
        responsavel,
        whatsapp,
        endereco,
      },
    };

    res.status(200).send({
      pet: response,
    });
  } catch (error) {
    if (error instanceof PetNaoEncontradoError) {
      return res.status(404).send({ message: error.message });
    }

    throw error;
  }
}
