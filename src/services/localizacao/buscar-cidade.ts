import { LocalizacaoRepository } from "@/repositories/localizacao";
import { Localizacao } from "@prisma/client";
import { CidadeNaoEncontradaError } from "../errors/cidade-nao-encontrada-error";

interface BuscarCidadeReq {
  cidade: string;
  uf: string;
}

interface BuscarCidadeRes {
  localizacao: Localizacao;
}

export class BuscarCidadeService {
  constructor(private localizacaoRepository: LocalizacaoRepository) {}

  async execute({ cidade, uf }: BuscarCidadeReq): Promise<BuscarCidadeRes> {
    const localizacao = await this.localizacaoRepository.find({ cidade, uf });

    if (!localizacao) {
      throw new CidadeNaoEncontradaError();
    }

    return { localizacao };
  }
}
