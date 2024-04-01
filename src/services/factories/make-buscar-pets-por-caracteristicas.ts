import { OrgRepository } from "@/repositories/prisma/org";
import { PetRepository } from "@/repositories/prisma/pet";
import { BuscarPetsPorCaracteristicasService } from "../pet/buscar-pets-por-caracteristicas";

export function makeBuscarPetsPorCaracteristicasService() {
  const petRepository = new PetRepository();
  const orgRepository = new OrgRepository();
  const sut = new BuscarPetsPorCaracteristicasService(petRepository, orgRepository);

  return sut;
}
