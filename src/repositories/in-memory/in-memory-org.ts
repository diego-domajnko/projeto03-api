import { Org } from "@prisma/client";
import { OrgRepository } from "../org";
import { randomUUID } from "crypto";

export class InMemoryOrgRepository implements OrgRepository {
  items: Org[] = [];

  async create(data: Org): Promise<Org> {
    const org: Org = {
      ...data,
      id: data.id ?? randomUUID(),
    };
    this.items.push(org);

    return org;
  }

  async findById(id: string): Promise<Org | null> {
    const org = this.items.find((org) => org.id === id) || null;

    return org;
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((org) => org.email === email) || null;

    return org;
  }

  async findManyByUf(ufId: number): Promise<Org[]> {
    const orgs = this.items.filter((org) => org.localizacao_id === ufId);

    return orgs;
  }

  async findManyByCity(cityId: number): Promise<Org[]> {
    const orgs = this.items.filter((org) => org.localizacao_id === cityId);

    return orgs;
  }
}
