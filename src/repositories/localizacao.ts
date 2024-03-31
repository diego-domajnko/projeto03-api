import { Localizacao, Prisma } from "@prisma/client";

export interface LocalizacaoRepository {
  create(data: Prisma.LocalizacaoCreateInput): Promise<void>;
  find(data: { cidade: string; uf: string }): Promise<Localizacao | null>;
}
