import { OrgRepository } from "@/repositories/prisma/org";
import { PetRepository } from "@/repositories/prisma/pet";
import { CriarPetService } from "../pet/criar-pet";

export function makeCriarPetService() {
  const petRepository = new PetRepository();
  const orgRepository = new OrgRepository();
  const sut = new CriarPetService(petRepository, orgRepository);

  return sut;
}
