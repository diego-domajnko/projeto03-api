import { OrgRepository } from "@/repositories/org";
import { Caracteristicas, PetRepository } from "@/repositories/pet";
import { Pet } from "@prisma/client";

interface BuscarPetsPorCaracteristicasReq {
  caracteristicas: Caracteristicas;
  cidade: number;
}

interface BuscarPetsPorCaracteristicasRes {
  pets: Pet[];
}

export class BuscarPetsPorCaracteristicasService {
  constructor(private petRepository: PetRepository, private orgRepository: OrgRepository) {}

  async execute({
    caracteristicas,
    cidade,
  }: BuscarPetsPorCaracteristicasReq): Promise<BuscarPetsPorCaracteristicasRes> {
    const orgs = await this.orgRepository.findManyByCity(cidade);
    const idOrgs = orgs.map((org) => org.id);
    const pets = await this.petRepository.findManyByCharacteristics(caracteristicas, idOrgs);

    return { pets };
  }
}
