import { LocalizacaoRepository } from "@/repositories/localizacao";
import { Localizacao } from "@prisma/client";

interface CadastrarCidadeReq {
  cidade: string;
  uf: string;
}

interface CadastrarCidadeRes {
  localizacao: Localizacao;
}

export class CadastrarCidadeService {
  constructor(private localizacaoRepository: LocalizacaoRepository) {}

  async execute(localizacao: CadastrarCidadeReq): Promise<CadastrarCidadeRes> {
    let novaLocalizacao = await this.localizacaoRepository.find(localizacao);

    if (!novaLocalizacao) {
      novaLocalizacao = await this.localizacaoRepository.create(localizacao);
    }

    return { localizacao: novaLocalizacao };
  }
}
