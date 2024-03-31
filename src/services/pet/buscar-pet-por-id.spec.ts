import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { BuscarPetPorIdService } from "./buscar-pet-por-id";
import { PetNaoEncontradoError } from "../errors/pet-nao-encontrado-error";

describe("Buscar pet por id", () => {
  let petRepository: InMemoryPetRepository;
  let sut: BuscarPetPorIdService;

  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new BuscarPetPorIdService(petRepository);
  });

  it("Deve retornar um pet", async () => {
    await petRepository.create({
      ambiente: "AMPLO",
      energia: "ALTA",
      id: "1",
      idade: "ADULTO",
      independencia: "ALTO",
      nome: "Rex",
      org_id: "1",
      porte: "MEDIO",
      requisitos: null,
      sobre: null,
    });

    const { pet } = await sut.execute({ id: "1" });

    expect(pet.id).toEqual("1");
  });

  it("Não deve retornar nenhum pet quando o id estiver incorreto", async () => {
    expect(async () => {
      await sut.execute({ id: "1" });
    }).rejects.toBeInstanceOf(PetNaoEncontradoError);
  });
});
