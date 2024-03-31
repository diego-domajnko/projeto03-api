import { OrgRepository } from "@/repositories/org";
import { PetRepository } from "@/repositories/pet";
import { Ambiente, Energia, Idade, Independencia, Pet, Porte } from "@prisma/client";
import { OrganizacaoNaoEncontradaError } from "../errors/organizacao-nao-encontrada-error";

interface CriarPetReq {
  nome: string;
  sobre: string | null;
  idade: Idade | null;
  porte: Porte | null;
  energia: Energia | null;
  independencia: Independencia | null;
  ambiente: Ambiente | null;
  requisitos: string | null;
  org_id: string;
}

interface CriarPetRes {
  pet: Pet;
}

export class CriarPetService {
  constructor(private petRepository: PetRepository, private orgRepository: OrgRepository) {}

  async execute(data: CriarPetReq): Promise<CriarPetRes> {
    const org = await this.orgRepository.findById(data.org_id);

    if (!org) {
      throw new OrganizacaoNaoEncontradaError();
    }

    const pet: Pet = await this.petRepository.create(data);

    return { pet };
  }
}
