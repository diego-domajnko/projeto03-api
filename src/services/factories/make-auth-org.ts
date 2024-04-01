import { OrgRepository } from "@/repositories/prisma/org";
import { AuthOrgService } from "../org/auth-org";

export function makeAuthOrgService() {
  const orgRepository = new OrgRepository();
  const sut = new AuthOrgService(orgRepository);

  return sut;
}
