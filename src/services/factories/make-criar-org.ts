import { LocalizacaoRepository } from "@/repositories/prisma/localizao";
import { OrgRepository } from "@/repositories/prisma/org";
import { UfsRepository } from "@/repositories/prisma/uf";
import { CreateOrgService } from "../org/criar-org";

export function makeCriarOrgService() {
  const orgRepository = new OrgRepository();
  const localizacaoRepository = new LocalizacaoRepository();
  const ufRepository = new UfsRepository();
  const sut = new CreateOrgService(orgRepository, localizacaoRepository, ufRepository);

  return sut;
}
