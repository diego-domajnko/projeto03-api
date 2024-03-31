import { InMemoryLocalizacaoRepository } from "@/repositories/in-memory/in-memory-localizacao";
import { beforeEach, describe, expect, it } from "vitest";
import { CadastrarCidadeService } from "./cadastrar-cidade";
import { CidadeNaoEncontradaError } from "../errors/cidade-nao-encontrada-error";

describe("Usos de caso de cadastro de cidade", () => {
  let localizacaoRepository: InMemoryLocalizacaoRepository;
  let sut: CadastrarCidadeService;

  beforeEach(() => {
    localizacaoRepository = new InMemoryLocalizacaoRepository();
    sut = new CadastrarCidadeService(localizacaoRepository);
  });

  it("Deve cadastrar uma cidade", async () => {
    const { localizacao } = await sut.execute({ cidade: "São Paulo", uf: "SP" });

    expect(localizacao).toEqual(
      expect.objectContaining({
        cidade: expect.any(String),
        uf: expect.any(String),
      })
    );
  });

  it("Não deve ser possível cadastrar duas cidades iguais", async () => {
    await sut.execute({ cidade: "São Paulo", uf: "SP" });
    await sut.execute({ cidade: "São Paulo", uf: "SP" });

    const localizacoes = await localizacaoRepository.findAll();

    expect(localizacoes).toHaveLength(1);
  });
});
