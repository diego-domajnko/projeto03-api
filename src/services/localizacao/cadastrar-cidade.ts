import { LocalizacaoRepository } from "@/repositories/localizacao";
import { CidadeNaoEncontradaError } from "../errors/cidade-nao-encontrada-error";

interface CadastrarCidadeReq {
  cep: string;
}

interface CadastrarCidadeRes {
  cidade: string;
  uf: string;
}

export class CadastrarCidadeService {
  constructor(private localizacaoRepository: LocalizacaoRepository) {}

  async execute({ cep }: CadastrarCidadeReq): Promise<CadastrarCidadeRes> {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const { localidade, uf } = await response.json();

    if (!localidade || !uf) {
      throw new CidadeNaoEncontradaError();
    }

    const novaLocalizacao = {
      cidade: localidade,
      uf,
    };

    await this.localizacaoRepository.create(novaLocalizacao);

    return novaLocalizacao;
  }
}
