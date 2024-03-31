import { InMemoryLocalizacaoRepository } from "@/repositories/in-memory/in-memory-localizacao";
import { beforeEach, describe, expect, it } from "vitest";
import { BuscarListaCidadesPorEstadoService } from "./buscar-lista-cidades-por-estado";

describe("Usos de caso de busca de cidade por estado", () => {
  let localizacaoRepository: InMemoryLocalizacaoRepository;
  let sut: BuscarListaCidadesPorEstadoService;

  beforeEach(() => {
    localizacaoRepository = new InMemoryLocalizacaoRepository();
    sut = new BuscarListaCidadesPorEstadoService(localizacaoRepository);
  });

  it("Deve buscar uma lista de cidades por estado", async () => {
    await localizacaoRepository.create({
      cidade: "São Paulo",
      uf: "SP",
      id: 1,
    });
    await localizacaoRepository.create({
      cidade: "Piracicaba",
      uf: "SP",
      id: 2,
    });
    await localizacaoRepository.create({
      cidade: "Porto Alegre",
      uf: "RS",
      id: 3,
    });
    await localizacaoRepository.create({
      cidade: "Canoas",
      uf: "RS",
      id: 3,
    });

    const { localizacoes } = await sut.execute({ uf: "RS" });

    expect(localizacoes).toHaveLength(2);
    expect(localizacoes).toEqual([
      expect.objectContaining({ cidade: "Porto Alegre", uf: "RS" }),
      expect.objectContaining({ cidade: "Canoas", uf: "RS" }),
    ]);
  });

  it("Não deve ser possivel listar cidades de um estado inexistente", async () => {
    const { localizacoes } = await sut.execute({ uf: "RJ" });

    expect(localizacoes).toHaveLength(0);
  });
});
