import { PetRepository } from "@/repositories/pet";
import { Pet } from "@prisma/client";
import { PetNaoEncontradoError } from "../errors/pet-nao-encontrado-error";

interface BuscarPetPorIdReq {
  id: string;
}

interface BuscarPetPorIdRes {
  pet: Pet;
}

export class BuscarPetPorIdService {
  constructor(private petRepository: PetRepository) {}

  async execute({ id }: BuscarPetPorIdReq): Promise<BuscarPetPorIdRes> {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new PetNaoEncontradoError();
    }

    return { pet };
  }
}
