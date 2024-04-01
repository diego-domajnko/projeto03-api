import { CriacaoSenhaInvalidaError } from "@/services/errors/criacao-senha-invalida-error";
import { EmailJaExistenteError } from "@/services/errors/email-ja-existente-error";
import { makeCriarOrgService } from "@/services/factories/make-criar-org";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function criarOrgController(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    responsavel: z.string(),
    email: z.string().email(),
    cep: z.string().min(8).max(9),
    endereco: z.string(),
    whatsapp: z.string().min(9).max(11),
    password: z.string().min(6),
  });
  const { cep, email, endereco, password, responsavel, whatsapp } = bodySchema.parse(req.body);

  try {
    const createOrgService = makeCriarOrgService();
    await createOrgService.execute({ cep, email, endereco, password, responsavel, whatsapp });
    return res.status(201).send({ message: "Organização criada com sucesso!" });
  } catch (error) {
    if (error instanceof CriacaoSenhaInvalidaError) {
      return res.status(400).send({ message: error.message });
    }
    if (error instanceof EmailJaExistenteError) {
      return res.status(400).send({ message: error.message });
    }
    throw error;
  }
}
