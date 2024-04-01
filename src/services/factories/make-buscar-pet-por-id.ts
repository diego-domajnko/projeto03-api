import { OrgRepository } from "@/repositories/prisma/org";
import { PetRepository } from "@/repositories/prisma/pet";
import { CriarPetService } from "../pet/criar-pet";
import { BuscarPetPorIdService } from "../pet/buscar-pet-por-id";

export function makeBuscarPetPorIdService() {
  const petRepository = new PetRepository();
  const sut = new BuscarPetPorIdService(petRepository);

  return sut;
}
