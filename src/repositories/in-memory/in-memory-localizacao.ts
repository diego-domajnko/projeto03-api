import { Localizacao } from "@prisma/client";
import { LocalizacaoRepository } from "../localizacao";

export class InMemoryLocalizacaoRepository implements LocalizacaoRepository {
  items: Localizacao[] = [];

  async create(data: Localizacao): Promise<Localizacao> {
    const localizacao: Localizacao = {
      cidade: data.cidade,
      id: data.id ?? this.items.length + 1,
      uf: data.uf,
    };
    this.items.push(localizacao);

    return localizacao;
  }

  async findIdByUf(uf: string): Promise<number | null> {
    const local = this.items.find((item) => item.uf.toLowerCase() === uf.toLowerCase()) ?? null;

    if (!local) return null;

    return local.id;
  }

  async find({ cidade, uf }: Localizacao): Promise<Localizacao | null> {
    const local =
      this.items.find(
        (item) =>
          item.cidade.toLowerCase() === cidade.toLowerCase() &&
          item.uf.toLowerCase() === uf.toLowerCase()
      ) ?? null;

    return local;
  }

  async findManyByUf(uf: string): Promise<Localizacao[]> {
    const localizacoes = this.items.filter((item) => item.uf.toLowerCase() === uf.toLowerCase());

    return localizacoes;
  }

  async findAll(): Promise<Localizacao[]> {
    return this.items;
  }
}
