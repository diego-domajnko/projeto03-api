import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { OrganizacaoNaoEncontradaError } from "../errors/organizacao-nao-encontrada-error";
import { CriarPetService } from "./criar-pet";

describe("Usos de caso de criação de cadastro de pet", () => {
  let petRepository: InMemoryPetRepository;
  let orgRepository: InMemoryOrgRepository;
  let sut: CriarPetService;

  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrgRepository();
    sut = new CriarPetService(petRepository, orgRepository);
  });

  it("Deve criar o cadastro de um nvoo pet", async () => {
    orgRepository.items.push({
      cep: "01001000",
      email: "jhondoe@example.com",
      endereco: "Teste",
      localizacao_id: 1,
      password_hash: await hash("Teste12", 6),
      responsavel: "Jhon Doe",
      uf_id: 1,
      whatsapp: "11999999999",
      id: "1",
    });

    const { pet } = await sut.execute({
      ambiente: "AMPLO",
      energia: "MEDIA",
      idade: "FILHOTE",
      independencia: "ALTO",
      nome: "Rex",
      org_id: "1",
      porte: "GRANDE",
      requisitos: null,
      sobre: null,
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("Não deve ser possivel cadastrar um nvoo pet em uma organização inexistente", async () => {
    expect(async () => {
      await sut.execute({
        ambiente: "AMPLO",
        energia: "MEDIA",
        idade: "FILHOTE",
        independencia: "ALTO",
        nome: "Rex",
        org_id: "1",
        porte: "GRANDE",
        requisitos: null,
        sobre: null,
      });
    }).rejects.toBeInstanceOf(OrganizacaoNaoEncontradaError);
  });
});
