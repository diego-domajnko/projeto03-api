import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org";
import { beforeEach, describe, expect, it } from "vitest";
import { OrgService } from "./org";
import { hash } from "bcrypt";
import { OrganizacaoNaoEncontradaError } from "./errors/organizacao-nao-encontrada-error";

describe("Usos de caso de validação de organização", () => {
  let orgRepository: InMemoryOrgRepository;
  let sut: OrgService;

  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new OrgService(orgRepository);
  });

  it("Deve retornar uma organização", async () => {
    await orgRepository.create({
      email: "jhondoe@example.com",
      cep: "99999-999",
      endereco: "Teste",
      id: "1",
      password_hash: await hash("Teste12", 6),
      responsavel: "Jhon Doe",
      whatsapp: "(51)99999-9999",
    });

    const { org } = await sut.execute({ id: "1" });

    expect(org.id).toEqual("1");
  });

  it("Não deve retornar uma organização quando o id for inválido", async () => {
    expect(async () => {
      await sut.execute({ id: "1" });
    }).rejects.toBeInstanceOf(OrganizacaoNaoEncontradaError);
  });
});
