import { OrganizacaoNaoEncontradaError } from "@/services/errors/organizacao-nao-encontrada-error";
import { makeCriarPetService } from "@/services/factories/make-criar-pet";
import { Ambiente, Energia, Idade, Independencia, Porte } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function criarPetController(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    nome: z.string(),
    sobre: z.string().nullable(),
    idade: z.enum([Idade.ADULTO, Idade.FILHOTE, Idade.SENIOR]).nullable(),
    porte: z.enum([Porte.GRANDE, Porte.MEDIO, Porte.PEQUENO]).nullable(),
    energia: z.enum([Energia.ALTA, Energia.BAIXA, Energia.MEDIA]).nullable(),
    independencia: z
      .enum([Independencia.ALTO, Independencia.BAIXO, Independencia.MEDIO])
      .nullable(),
    ambiente: z.enum([Ambiente.AMPLO, Ambiente.MEDIO, Ambiente.PEQUENO]).nullable(),
    requisitos: z.string().nullable(),
  });

  const { ambiente, energia, idade, independencia, nome, porte, requisitos, sobre } =
    bodySchema.parse(req.body);

  try {
    const criarPetService = makeCriarPetService();
    await criarPetService.execute({
      ambiente,
      energia,
      idade,
      independencia,
      nome,
      org_id: req.user.sub,
      porte,
      requisitos,
      sobre,
    });

    return res.status(201).send({ message: "Pet criado com sucesso!" });
  } catch (error) {
    if (error instanceof OrganizacaoNaoEncontradaError) {
      return res.status(404).send({ message: error.message });
    }

    throw error;
  }
}
