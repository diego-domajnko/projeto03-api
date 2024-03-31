import { Localizacao } from "@prisma/client";
import { LocalizacaoRepository } from "../localizacao";

export class InMemoryLocalizacaoRepository implements LocalizacaoRepository {
  items: Localizacao[] = [];

  async create(data: Localizacao): Promise<void> {
    this.items.push(data);
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
}
