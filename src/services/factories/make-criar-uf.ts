import { UfsRepository } from "@/repositories/prisma/uf";
import { CriarUFService } from "../uf/criar-uf";

export function makeCriarUfService() {
  const ufRepository = new UfsRepository();
  const sut = new CriarUFService(ufRepository);

  return sut;
}
