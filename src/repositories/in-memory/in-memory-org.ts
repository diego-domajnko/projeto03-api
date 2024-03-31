import { Org } from "@prisma/client";
import { OrgRepository } from "../org";

export class InMemoryOrgRepository implements OrgRepository {
  items: Org[] = [];

  async create(data: Org): Promise<void> {
    this.items.push(data);
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((org) => org.email === email) || null;

    return org;
  }
}
