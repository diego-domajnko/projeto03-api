import { Localizacao, Prisma } from "@prisma/client";

export interface LocalizacaoRepository {
  create(data: Prisma.LocalizacaoUncheckedCreateInput): Promise<Localizacao>;
  findIdByUf: (uf: string) => Promise<number | null>;
  find(data: { cidade: string; uf: string }): Promise<Localizacao | null>;
  findManyByUf(uf: string): Promise<Localizacao[]>;
  findAll(): Promise<Localizacao[]>;
}
