import { LocalizacaoRepository } from "@/repositories/localizacao";
import { OrgRepository } from "@/repositories/org";
import { Org } from "@prisma/client";
import { LocalizacaoNaoEncontradaError } from "../errors/localizacao-nao-encontrada-erro";

interface BuscarOrgsPorUfReq {
  uf: string;
}
interface BuscarOrgsPorUfRes {
  orgs: Org[];
}

export class BuscarOrgsPorUfService {
  constructor(
    private orgsRepository: OrgRepository,
    private localizacaoRepository: LocalizacaoRepository
  ) {}

  async execute({ uf }: BuscarOrgsPorUfReq): Promise<BuscarOrgsPorUfRes> {
    const ufId = await this.localizacaoRepository.findIdByUf(uf);

    if (!ufId) {
      throw new LocalizacaoNaoEncontradaError();
    }

    const orgs = await this.orgsRepository.findManyByUf(ufId);

    return { orgs };
  }
}
