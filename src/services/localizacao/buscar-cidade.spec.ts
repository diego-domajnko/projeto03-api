import { InMemoryLocalizacaoRepository } from "@/repositories/in-memory/in-memory-localizacao";
import { beforeEach, describe, expect, it } from "vitest";
import { BuscarCidadeService } from "./buscar-cidade";
import { CidadeNaoEncontradaError } from "../errors/cidade-nao-encontrada-error";

describe("Usos de caso de busca de cidade", () => {
  let localizacaoRepository: InMemoryLocalizacaoRepository;
  let sut: BuscarCidadeService;

  beforeEach(() => {
    localizacaoRepository = new InMemoryLocalizacaoRepository();
    sut = new BuscarCidadeService(localizacaoRepository);
  });

  it("Deve buscar uma cidade", async () => {
    localizacaoRepository.create({
      cidade: "São Paulo",
      uf: "SP",
      id: 1,
    });
    const { localizacao } = await sut.execute({
      cidade: "São Paulo",
      uf: "SP",
    });

    expect(localizacao).toEqual(expect.objectContaining({ cidade: "São Paulo", uf: "SP" }));
  });

  it("Não deve ser possivel buscar uma cidade inexistente", async () => {
    expect(async () => {
      await sut.execute({ cidade: "Rio de Janeiro", uf: "RJ" });
    }).rejects.toBeInstanceOf(CidadeNaoEncontradaError);
  });
});
