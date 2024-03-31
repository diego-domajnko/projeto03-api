import { UfsRepository } from "@/repositories/uf";
import { Uf } from "@prisma/client";

interface CriarUFReq {
  uf: string;
}

interface CriarUFRes {
  uf: Uf;
}

export class CriarUFService {
  constructor(private ufRepository: UfsRepository) {}

  async execute({ uf }: CriarUFReq): Promise<CriarUFRes> {
    let novaUf = await this.ufRepository.findUniqueByUf(uf);

    if (!novaUf) {
      novaUf = await this.ufRepository.create({ uf });
    }

    return { uf: novaUf };
  }
}
