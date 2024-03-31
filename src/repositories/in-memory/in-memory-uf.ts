import { Uf } from "@prisma/client";
import { UfsRepository } from "../uf";

export class InMemoryUfRepository implements UfsRepository {
  items: Uf[] = [];

  async create(data: Uf): Promise<Uf> {
    const uf: Uf = {
      id: data.id ?? this.items.length + 1,
      uf: data.uf,
    };
    this.items.push(uf);

    return uf;
  }

  async findUniqueByUf(uf: string): Promise<Uf | null> {
    const UF = this.items.find((v) => v.uf.toLowerCase() === uf.toLowerCase()) ?? null;
    return UF;
  }

  async findAll(): Promise<Uf[]> {
    return this.items;
  }
}
