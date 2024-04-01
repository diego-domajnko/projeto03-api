import { OrgRepository } from "@/repositories/prisma/org";
import { PetRepository } from "@/repositories/prisma/pet";
import { BuscarPetsPorCidadeService } from "../pet/buscar-pets-por-cidade";

export function makeBuscarPetsPorCidadeService() {
  const petRepository = new PetRepository();
  const orgRepository = new OrgRepository();
  const sut = new BuscarPetsPorCidadeService(petRepository, orgRepository);

  return sut;
}
