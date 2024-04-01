import { OrgRepository } from "@/repositories/org";
import { hash } from "bcrypt";
import { z } from "zod";
import { CriacaoSenhaInvalidaError } from "../errors/criacao-senha-invalida-error";
import { EmailJaExistenteError } from "../errors/email-ja-existente-error";
import { LocalizacaoRepository } from "@/repositories/localizacao";
import { CadastrarCidadeService } from "../localizacao/cadastrar-cidade";
import { UfsRepository } from "@/repositories/uf";
import { fetchCep } from "@/utils/fetchCep";
import { CriarUFService } from "../uf/criar-uf";

interface CreateOrgReq {
  responsavel: string;
  email: string;
  cep: string;
  endereco: string;
  password: string;
  whatsapp: string;
}

export class CreateOrgService {
  constructor(
    private orgRepository: OrgRepository,
    private localizacaoRepository: LocalizacaoRepository,
    private ufRepository: UfsRepository
  ) {}

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

    const { uf, cidade } = await fetchCep(cep);

    const cadastrarUfService = new CriarUFService(this.ufRepository);
    const { uf: novaUf } = await cadastrarUfService.execute({ uf });
    const cadastrarCidadeService = new CadastrarCidadeService(this.localizacaoRepository);
    const { localizacao } = await cadastrarCidadeService.execute({ cidade, uf });

    await this.orgRepository.create({
      responsavel,
      email,
      cep,
      endereco,
      whatsapp,
      password_hash: await hash(password, 6),
      localizacao_id: localizacao.id,
      uf_id: novaUf.id,
    });
  }
}
