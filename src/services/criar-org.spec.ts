import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgService } from "./criar-org";
import { EmailJaExistenteError } from "./errors/email-ja-existente-error";
import { CriacaoSenhaInvalidaError } from "./errors/criacao-senha-invalida-error";

describe("Usos de caso de criação de organização", () => {
  let criarOrgRepository: InMemoryOrgRepository;
  let sut: CreateOrgService;

  beforeEach(() => {
    criarOrgRepository = new InMemoryOrgRepository();
    sut = new CreateOrgService(criarOrgRepository);
  });

  it("Deve criar uma organização com sucesso", async () => {
    await sut.execute({
      email: "jhondoe@example.com",
      cep: "11111-000",
      endereco: "Rua teste, 123",
      password: "Teste12",
      responsavel: "Jhon Doe",
      whatsapp: "51999999999",
    });

    const org = await criarOrgRepository.findByEmail("jhondoe@example.com");

    expect(org).not.toBeNull();
  });

  it("Não deve ser possível criar uma organização com um email já existente", async () => {
    await sut.execute({
      email: "jhondoe@example.com",
      cep: "11111-000",
      endereco: "Rua teste, 123",
      password: "Teste12",
      responsavel: "Jhon Doe",
      whatsapp: "51999999999",
    });

    expect(
      async () =>
        await sut.execute({
          email: "jhondoe@example.com",
          cep: "11111-000",
          endereco: "Rua teste, 123",
          password: "Teste123",
          responsavel: "Jhon Doe",
          whatsapp: "51999999999",
        })
    ).rejects.toBeInstanceOf(EmailJaExistenteError);
  });

  it("Não deve ser possível criar uma organização com uma senha inválida", async () => {
    expect(
      async () =>
        await sut.execute({
          email: "jhondoe@example.com",
          cep: "11111-000",
          endereco: "Rua teste, 123",
          password: "teste12",
          responsavel: "Jhon Doe",
          whatsapp: "51999999999",
        })
    ).rejects.toBeInstanceOf(CriacaoSenhaInvalidaError);
  });

  it("Não deve ser possível criar uma organização com o formato inválido de um telefone", async () => {
    expect(
      async () =>
        await sut.execute({
          email: "jhondoe@example.com",
          cep: "11111-000",
          endereco: "Rua teste, 123",
          password: "Teste12",
          responsavel: "Jhon Doe",
          whatsapp: "519999999",
        })
    ).rejects.toBeInstanceOf(Error);
  });

  it("Não deve ser possível criar uma organização com o formato inválido de um cep", async () => {
    expect(
      async () =>
        await sut.execute({
          email: "jhondoe@example.com",
          cep: "11111-0",
          endereco: "Rua teste, 123",
          password: "Teste12",
          responsavel: "Jhon Doe",
          whatsapp: "51999999999",
        })
    ).rejects.toBeInstanceOf(Error);
  });
});
