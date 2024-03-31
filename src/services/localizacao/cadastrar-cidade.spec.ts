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
    const local = await sut.execute({ cep: "01001000" });

    expect(local).toEqual(
      expect.objectContaining({
        cidade: expect.any(String),
        uf: expect.any(String),
      })
    );
  });

  it("Não deve ser possivel cadastrar uma cidade com o cep inexistente", async () => {
    expect(async () => {
      await sut.execute({ cep: "00000000" });
    }).rejects.toBeInstanceOf(CidadeNaoEncontradaError);
  });
});
