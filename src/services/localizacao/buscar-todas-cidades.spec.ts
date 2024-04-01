import { InMemoryLocalizacaoRepository } from "@/repositories/in-memory/in-memory-localizacao";
import { beforeEach, describe, expect, it } from "vitest";
import { BuscarTodasCidades } from "./buscar-todas-cidades";

describe("Buscar todas as cidades cadastradas", () => {
  let localizacaoRepository: InMemoryLocalizacaoRepository;
  let sut: BuscarTodasCidades;

  beforeEach(() => {
    localizacaoRepository = new InMemoryLocalizacaoRepository();
    sut = new BuscarTodasCidades(localizacaoRepository);
  });

  it("Deve retornar todas as cidades cadastradas", async () => {
    await localizacaoRepository.create({
      uf: "SP",
      cidade: "São Paulo",
      id: 1,
    });
    await localizacaoRepository.create({
      uf: "RJ",
      cidade: "Rio de Janeiro",
      id: 2,
    });
    await localizacaoRepository.create({
      uf: "RS",
      cidade: "Rio Grande do Sul",
      id: 3,
    });

    const { cidades } = await sut.execute();

    expect(cidades).toHaveLength(3);
    expect(cidades).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ cidade: "São Paulo" }),
        expect.objectContaining({ cidade: "Rio de Janeiro" }),
        expect.objectContaining({ cidade: "Rio Grande do Sul" }),
      ])
    );
  });
});
