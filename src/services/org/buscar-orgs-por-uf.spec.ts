import { InMemoryLocalizacaoRepository } from "@/repositories/in-memory/in-memory-localizacao";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org";
import { beforeEach, describe, expect, it } from "vitest";
import { BuscarOrgsPorUfService } from "./buscar-orgs-por-uf";
import { hash } from "bcrypt";
import { LocalizacaoNaoEncontradaError } from "../errors/localizacao-nao-encontrada-erro";

describe("Buscar organizações por UF", () => {
  let orgsRepository: InMemoryOrgRepository;
  let localizacaoRepository: InMemoryLocalizacaoRepository;
  let sut: BuscarOrgsPorUfService;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    localizacaoRepository = new InMemoryLocalizacaoRepository();
    sut = new BuscarOrgsPorUfService(orgsRepository, localizacaoRepository);
  });

  it("Deve ser possivel encontrar uma lista de organizações por UF", async () => {
    await localizacaoRepository.create({
      id: 1,
      cidade: "São Paulo",
      uf: "SP",
    });

    await localizacaoRepository.create({
      id: 2,
      cidade: "Porto Alegre",
      uf: "RS",
    });

    for (let i = 1; i <= 5; i++) {
      await orgsRepository.create({
        id: `id-${i}`,
        email: `email${i}@org.com`,
        cep: "01001000",
        endereco: "",
        password_hash: await hash("123456", 6),
        responsavel: "Jhon",
        whatsapp: "11999999999",
        localizacao_id: i % 2 === 0 ? 2 : 1,
        uf_id: i % 2 === 0 ? 2 : 1,
      });
    }

    const { orgs } = await sut.execute({ uf: "RS" });

    expect(orgs.length).toBe(2);
    expect(orgs).toEqual([
      expect.objectContaining({
        localizacao_id: 2,
      }),
      expect.objectContaining({
        localizacao_id: 2,
      }),
    ]);
  });

  it("Não deve ser possível listar organizações com uma UF inexistente", async () => {
    expect(async () => {
      await sut.execute({ uf: "RS" });
    }).rejects.toBeInstanceOf(LocalizacaoNaoEncontradaError);
  });
});
