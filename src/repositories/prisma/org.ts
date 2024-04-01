import { prisma } from "@/lib/prisma";
import { Org } from "@prisma/client";
import { OrgRepository as IOrgRepository } from "../org";

export class OrgRepository implements IOrgRepository {
  async create(data: Org): Promise<Org> {
    const org = await prisma.org.create({
      data: {
        cep: data.cep,
        email: data.email,
        endereco: data.endereco,
        password_hash: data.password_hash,
        responsavel: data.responsavel,
        whatsapp: data.whatsapp,
        localizacao_id: data.localizacao_id,
        uf_id: data.uf_id,
      },
    });

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findFirst({
      where: {
        id,
      },
    });

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    });

    return org;
  }

  async findManyByUf(ufId: number): Promise<Org[]> {
    const orgs = await prisma.org.findMany({
      where: {
        uf_id: ufId,
      },
    });

    return orgs;
  }

  async findManyByCity(cityId: number): Promise<Org[]> {
    const orgs = await prisma.org.findMany({
      where: {
        localizacao_id: cityId,
      },
    });

    return orgs;
  }
}
