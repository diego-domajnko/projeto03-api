import { OrgRepository } from "@/repositories/org";
import { Org } from "@prisma/client";
import { OrganizacaoNaoEncontradaError } from "../errors/organizacao-nao-encontrada-error";

interface BuscarOrgReq {
  id: string;
}

interface BuscarOrgRes {
  org: Org;
}

export class BuscarOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ id }: BuscarOrgReq): Promise<BuscarOrgRes> {
    const org = await this.orgRepository.findById(id);

    if (!org) {
      throw new OrganizacaoNaoEncontradaError();
    }

    return { org };
  }
}
