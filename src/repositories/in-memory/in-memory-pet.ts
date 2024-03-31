import { $Enums, Pet } from "@prisma/client";
import { Caracteristicas, PetRepository } from "../pet";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository {
  items: Pet[] = [];

  async create(data: Pet): Promise<Pet> {
    const pet: Pet = {
      ...data,
      id: data.id ?? randomUUID(),
    };
    this.items.push(pet);

    return pet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === id) ?? null;

    return pet;
  }

  async findManyByCity(idOrgs: string[]): Promise<Pet[]> {
    const pets = this.items.filter((pet) => idOrgs.includes(pet.org_id));

    return pets;
  }

  async findManyByCharacteristics(
    { ambiente, energia, idade, independencia, porte }: Caracteristicas,
    orgs: string[]
  ): Promise<Pet[]> {
    let pets = await this.findManyByCity(orgs);

    if (ambiente) {
      pets = this.items.filter((pet) => pet.ambiente && ambiente.includes(pet.ambiente));
    }

    if (energia) {
      pets = pets.filter((pet) => pet.energia && energia.includes(pet.energia));
    }

    if (idade) {
      pets = pets.filter((pet) => pet.idade && idade.includes(pet.idade));
    }

    if (independencia) {
      pets = pets.filter((pet) => pet.independencia && independencia.includes(pet.independencia));
    }

    if (porte) {
      pets = pets.filter((pet) => pet.porte && porte.includes(pet.porte));
    }

    return pets;
  }
}
