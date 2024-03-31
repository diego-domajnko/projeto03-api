import { InMemoryLocalizacaoRepository } from "@/repositories/in-memory/in-memory-localizacao";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet";
import { InMemoryUfRepository } from "@/repositories/in-memory/in-memory-uf";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { BuscarPetsPorCidadeService } from "./buscar-pets-por-cidade";

describe("Buscar pets por cidade", () => {
  let petRepository: InMemoryPetRepository;
  let orgRepository: InMemoryOrgRepository;
  let localizacaoRepository: InMemoryLocalizacaoRepository;
  let ufRepository: InMemoryUfRepository;
  let sut: BuscarPetsPorCidadeService;

  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    orgRepository = new InMemoryOrgRepository();
    localizacaoRepository = new InMemoryLocalizacaoRepository();
    ufRepository = new InMemoryUfRepository();
    sut = new BuscarPetsPorCidadeService(petRepository, orgRepository);
  });

  it("deve retornar os pets de uma cidade específica", async () => {
    const { uf, id: uf_id } = await ufRepository.create({
      uf: "SP",
      id: 1,
    });

    const { id: cidade1 } = await localizacaoRepository.create({
      cidade: "São Paulo",
      uf: uf,
      id: 1,
    });

    const { id: cidade2 } = await localizacaoRepository.create({
      cidade: "Piracicaba",
      uf: uf,
      id: 2,
    });

    await orgRepository.create({
      cep: "01001000",
      email: "jhondoe1@example.com",
      endereco: "Teste",
      password_hash: await hash("Teste12", 6),
      responsavel: "Jhon Doe",
      whatsapp: "11999999999",
      localizacao_id: cidade1,
      id: "1",
      uf_id,
    });

    await orgRepository.create({
      cep: "01001000",
      email: "jhondoe2@example.com",
      endereco: "Teste",
      password_hash: await hash("Teste12", 6),
      responsavel: "Jhon Doe",
      whatsapp: "11999999998",
      localizacao_id: cidade2,
      id: "2",
      uf_id,
    });

    await orgRepository.create({
      cep: "01001000",
      email: "jhondoe3@example.com",
      endereco: "Teste",
      password_hash: await hash("Teste12", 6),
      responsavel: "Jhon Doe",
      whatsapp: "11999999997",
      localizacao_id: cidade1,
      id: "3",
      uf_id,
    });

    await petRepository.create({
      ambiente: null,
      energia: null,
      id: "1",
      idade: null,
      independencia: null,
      nome: "Rex",
      org_id: "1",
      porte: null,
      requisitos: null,
      sobre: null,
    });

    await petRepository.create({
      ambiente: null,
      energia: null,
      id: "2",
      idade: null,
      independencia: null,
      nome: "Toby",
      org_id: "2",
      porte: null,
      requisitos: null,
      sobre: null,
    });

    await petRepository.create({
      ambiente: null,
      energia: null,
      id: "3",
      idade: null,
      independencia: null,
      nome: "Bolt",
      org_id: "3",
      porte: null,
      requisitos: null,
      sobre: null,
    });

    const { pets } = await sut.execute({ id_cidade: 1 });
    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ nome: "Rex" }),
      expect.objectContaining({ nome: "Bolt" }),
    ]);
  });
});
