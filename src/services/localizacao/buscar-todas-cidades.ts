import { LocalizacaoRepository } from "@/repositories/prisma/localizao";
import { Localizacao } from "@prisma/client";

interface BuscarTodasCidadesRes {
  cidades: Localizacao[];
}

export class BuscarTodasCidades {
  constructor(private localizacaoRepository: LocalizacaoRepository) {}

  async execute(): Promise<BuscarTodasCidadesRes> {
    const cidades = await this.localizacaoRepository.findAll();

    return { cidades };
  }
}
