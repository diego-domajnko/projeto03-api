import { OrgRepository } from "@/repositories/org";
import { Org } from "@prisma/client";
import { OrganizacaoNaoEncontradaError } from "./errors/organizacao-nao-encontrada-error";

interface OrgReq {
  id: string;
}

interface OrgRes {
  org: Org;
}

export class OrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ id }: OrgReq): Promise<OrgRes> {
    const org = await this.orgRepository.findById(id);

    if (!org) {
      throw new OrganizacaoNaoEncontradaError();
    }

    return { org };
  }
}
