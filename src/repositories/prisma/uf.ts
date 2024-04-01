import { prisma } from "@/lib/prisma";
import { Uf } from "@prisma/client";
import { UfsRepository as IUfsRepository } from "../uf";

export class UfsRepository implements IUfsRepository {
  async create(data: Uf): Promise<Uf> {
    const uf = await prisma.uf.create({
      data: {
        uf: data.uf,
      },
    });

    return uf;
  }

  async findUniqueByUf(uf: string): Promise<Uf | null> {
    const ufData = await prisma.uf.findFirst({
      where: {
        uf,
      },
    });

    return ufData;
  }

  async findAll(): Promise<Uf[]> {
    const ufs = await prisma.uf.findMany();

    return ufs;
  }
}
