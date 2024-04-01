import { Localizacao, Prisma } from "@prisma/client";
import { LocalizacaoRepository as ILocalizacaoRepository } from "../localizacao";
import { prisma } from "@/lib/prisma";

export class LocalizacaoRepository implements ILocalizacaoRepository {
  async create({ cidade, uf }: Localizacao): Promise<Localizacao> {
    const localizacao = await prisma.localizacao.create({
      data: {
        cidade,
        uf,
      },
    });

    return localizacao;
  }

  async findIdByUf(uf: string): Promise<number | null> {
    const localizacao = await prisma.localizacao.findFirst({
      where: {
        uf,
      },
    });

    return localizacao?.id ?? null;
  }

  async find({ cidade, uf }: { cidade: string; uf: string }): Promise<Localizacao | null> {
    const localizacao = await prisma.localizacao.findFirst({
      where: {
        cidade,
        uf,
      },
    });

    return localizacao;
  }

  async findManyByUf(uf: string): Promise<Localizacao[]> {
    const localizacoes = await prisma.localizacao.findMany({
      where: {
        uf,
      },
    });

    return localizacoes;
  }

  async findAll(): Promise<Localizacao[]> {
    const localizacoes = await prisma.localizacao.findMany();

    return localizacoes;
  }
}
