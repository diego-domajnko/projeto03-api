import { OrgRepository } from "@/repositories/org";
import { PetRepository } from "@/repositories/pet";
import { Pet } from "@prisma/client";

interface BuscarPetsPorCidadeReq {
  id_cidade: number;
}

interface BuscarPetsPorCidadeRes {
  pets: Pet[];
}

export class BuscarPetsPorCidadeService {
  constructor(private petRepository: PetRepository, private orgRepository: OrgRepository) {}

  async execute({ id_cidade }: BuscarPetsPorCidadeReq): Promise<BuscarPetsPorCidadeRes> {
    const orgs = await this.orgRepository.findManyByCity(id_cidade);
    const idOrgs = orgs.map((org) => org.id);

    const pets = await this.petRepository.findManyByCity(idOrgs);

    return { pets };
  }
}
