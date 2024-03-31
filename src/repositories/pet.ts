import { Ambiente, Energia, Idade, Independencia, Pet, Porte, Prisma } from "@prisma/client";

export interface Caracteristicas {
  idade?: Idade[] | null;
  porte?: Porte[] | null;
  energia?: Energia[] | null;
  independencia?: Independencia[] | null;
  ambiente?: Ambiente[] | null;
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findManyByCity(idOrgs: string[]): Promise<Pet[]>;
  findManyByCharacteristics(characteristics: Caracteristicas, orgs: string[]): Promise<Pet[]>;
}
