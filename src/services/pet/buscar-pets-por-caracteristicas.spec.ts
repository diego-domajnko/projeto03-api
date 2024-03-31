import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { BuscarPetsPorCaracteristicasService } from "./buscar-pets-por-caracteristicas";

describe("Buscar pets por caracteristicas", () => {
  let petRepository: InMemoryPetRepository;
  let orgRepository: InMemoryOrgRepository;
  let sut: BuscarPetsPorCaracteristicasService;

  beforeEach(async () => {
    petRepository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrgRepository();
    sut = new BuscarPetsPorCaracteristicasService(petRepository, orgRepository);

    await orgRepository.create({
      cep: "91360210",
      email: "jhondoe@example.com",
      endereco: "Teste",
      id: "1",
      localizacao_id: 1,
      password_hash: await hash("Teste12", 6),
      responsavel: "Jhon Doe",
      uf_id: 1,
      whatsapp: "51999999999",
    });

    await orgRepository.create({
      cep: "01001000",
      email: "jhondoe@example.com",
      endereco: "Teste",
      id: "2",
      localizacao_id: 2,
      password_hash: await hash("Teste12", 6),
      responsavel: "Jhon Doe",
      uf_id: 2,
      whatsapp: "51999999999",
    });

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

    await petRepository.create({
      ambiente: "MEDIO",
      energia: "ALTA",
      id: "2",
      idade: "FILHOTE",
      independencia: "MEDIO",
      nome: "Toby",
      org_id: "1",
      porte: "GRANDE",
      requisitos: null,
      sobre: null,
    });

    await petRepository.create({
      ambiente: "PEQUENO",
      energia: "BAIXA",
      id: "3",
      idade: "SENIOR",
      independencia: "BAIXO",
      nome: "Bolinha",
      org_id: "1",
      porte: "PEQUENO",
      requisitos: null,
      sobre: null,
    });

    await petRepository.create({
      ambiente: "AMPLO",
      energia: "BAIXA",
      id: "4",
      idade: "FILHOTE",
      independencia: "ALTO",
      nome: "Peludo",
      org_id: "2",
      porte: "GRANDE",
      requisitos: null,
      sobre: null,
    });

    await petRepository.create({
      ambiente: "MEDIO",
      energia: "ALTA",
      id: "5",
      idade: "SENIOR",
      independencia: "MEDIO",
      nome: "Amora",
      org_id: "1",
      porte: "GRANDE",
      requisitos: null,
      sobre: null,
    });

    await petRepository.create({
      ambiente: "MEDIO",
      energia: "MEDIA",
      id: "6",
      idade: "FILHOTE",
      independencia: "MEDIO",
      nome: "Pimpo",
      org_id: "2",
      porte: "GRANDE",
      requisitos: null,
      sobre: null,
    });
  });

  it("Deve retornar os pets de acordo com um filtro selecionado", async () => {
    const { pets } = await sut.execute({
      caracteristicas: {
        idade: ["FILHOTE"],
      },
      cidade: 2,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ nome: "Peludo" }),
      expect.objectContaining({ nome: "Pimpo" }),
    ]);
  });

  it("Deve retornar os pets de acordo com mais de um filtro selecionado", async () => {
    const { pets } = await sut.execute({
      caracteristicas: {
        idade: ["SENIOR"],
        energia: ["ALTA"],
      },
      cidade: 1,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ nome: "Amora" })]);
  });

  it("Deve retornar os pets de acordo com mais de uma opção selecionada do mesmo filtro", async () => {
    const { pets } = await sut.execute({
      caracteristicas: {
        idade: ["FILHOTE", "ADULTO"],
      },
      cidade: 1,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ nome: "Rex" }),
      expect.objectContaining({ nome: "Toby" }),
    ]);
  });

  it("Não deve retornar nenhum pet quando não houver nenhum pet com as características selecionadas", async () => {
    const { pets } = await sut.execute({
      caracteristicas: {
        idade: ["ADULTO"],
        ambiente: ["MEDIO"],
      },
      cidade: 1,
    });

    expect(pets).toHaveLength(0);
  });

  it("Deve retornar todos os pets quando não houver nenhum filtro selecionado e a cidade estiver correta", async () => {
    const { pets } = await sut.execute({
      caracteristicas: {},
      cidade: 2,
    });

    expect(pets).toHaveLength(2);
  });

  it("Não deve retornar nenhum pet quando não houver nenhum pet na cidade selecionada", async () => {
    const { pets } = await sut.execute({
      caracteristicas: {},
      cidade: 3,
    });

    expect(pets).toHaveLength(0);
  });
});
