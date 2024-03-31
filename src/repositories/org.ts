import { Org, Prisma } from "@prisma/client";

export interface OrgRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findManyByUf(ufId: number): Promise<Org[]>;
  findManyByCity(cityId: number): Promise<Org[]>;
}
