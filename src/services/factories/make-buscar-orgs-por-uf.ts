import { LocalizacaoRepository } from "@/repositories/prisma/localizao";
import { OrgRepository } from "@/repositories/prisma/org";
import { BuscarOrgsPorUfService } from "../org/buscar-orgs-por-uf";

export function makeBuscarOrgsPorUfService() {
  const orgRepository = new OrgRepository();
  const localizacaoRepository = new LocalizacaoRepository();
  const sut = new BuscarOrgsPorUfService(orgRepository, localizacaoRepository);

  return sut;
}
