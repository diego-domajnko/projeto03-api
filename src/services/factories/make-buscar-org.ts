import { OrgRepository } from "@/repositories/prisma/org";
import { BuscarOrgService } from "../org/buscar-org";

export function makeBuscarOrgService() {
  const orgRepository = new OrgRepository();
  const sut = new BuscarOrgService(orgRepository);

  return sut;
}
