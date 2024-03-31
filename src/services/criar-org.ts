import { OrgRepository } from "@/repositories/org";
import { hash } from "bcrypt";
import { z } from "zod";
import { CriacaoSenhaInvalidaError } from "./errors/criacao-senha-invalida-error";
import { EmailJaExistenteError } from "./errors/email-ja-existente-error";

interface CreateOrgReq {
  responsavel: string;
  email: string;
  cep: string;
  endereco: string;
  password: string;
  whatsapp: string;
}

export class CreateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(data: CreateOrgReq): Promise<void> {
    const createOrgBodySchema = z.object({
      responsavel: z.string(),
      email: z.string().email(),
      cep: z
        .string()
        .min(8)
        .max(9)
        .refine((cep) => {
          const regexCEP: RegExp = /^\d{5}[-]*\d{3}$/;
          return regexCEP.test(cep);
        }),
      endereco: z.string(),
      password: z.string().min(6),
      whatsapp: z.string().refine((tel) => {
        const regexTelefone: RegExp = /^\(?\d{2}\)?[-. ]?\d{4,5}[-. ]?\d{4}$/;
        return regexTelefone.test(tel);
      }),
    });

    const { cep, email, endereco, password, responsavel, whatsapp } =
      createOrgBodySchema.parse(data);

    const passRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/;

    if (!passRegex.test(password)) {
      throw new CriacaoSenhaInvalidaError();
    }

    const jaExisteEmailCadastrado = await this.orgRepository.findByEmail(email);

    if (jaExisteEmailCadastrado) {
      throw new EmailJaExistenteError();
    }

    await this.orgRepository.create({
      responsavel,
      email,
      cep,
      endereco,
      whatsapp,
      password_hash: await hash(password, 6),
    });
  }
}
