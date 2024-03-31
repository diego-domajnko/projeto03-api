import { Prisma, Uf } from "@prisma/client";

export interface UfsRepository {
  create(data: Prisma.UfCreateInput): Promise<Uf>;
  findUniqueByUf(uf: string): Promise<Uf | null>;
  findAll(): Promise<Uf[]>;
}
