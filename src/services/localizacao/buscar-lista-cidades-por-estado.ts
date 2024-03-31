import { LocalizacaoRepository } from "@/repositories/localizacao";
import { Localizacao } from "@prisma/client";

interface BuscarListaCidadesPorEstadoReq {
  uf: string;
}

interface BuscarListaCidadesPorEstadoRes {
  localizacoes: Localizacao[];
}

export class BuscarListaCidadesPorEstadoService {
  constructor(private localizacaoRepository: LocalizacaoRepository) {}

  async execute({ uf }: BuscarListaCidadesPorEstadoReq): Promise<BuscarListaCidadesPorEstadoRes> {
    const localizacoes = await this.localizacaoRepository.findManyByUf(uf);

    return { localizacoes };
  }
}
