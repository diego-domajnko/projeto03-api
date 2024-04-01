import { prisma } from "@/lib/prisma";
import { Pet } from "@prisma/client";
import { Caracteristicas, PetRepository as IPetRepository } from "../pet";

export class PetRepository implements IPetRepository {
  async create(data: Pet): Promise<Pet> {
    const pet = await prisma.pet.create({
      data: {
        nome: data.nome,
        ambiente: data.ambiente,
        energia: data.energia,
        idade: data.idade,
        independencia: data.independencia,
        org_id: data.org_id,
        porte: data.porte,
        requisitos: data.requisitos,
        sobre: data.sobre,
      },
    });

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    });

    return pet;
  }

  async findManyByCity(idOrgs: string[]): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: idOrgs,
        },
      },
    });

    return pets;
  }

  async findManyByCharacteristics(
    characteristics: Caracteristicas,
    orgs: string[]
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: {
          in: orgs,
        },
        ambiente: {
          in: characteristics.ambiente,
        },
        energia: {
          in: characteristics.energia,
        },
        idade: {
          in: characteristics.idade,
        },
        independencia: {
          in: characteristics.independencia,
        },
        porte: {
          in: characteristics.porte,
        },
      },
    });

    return pets;
  }
}
