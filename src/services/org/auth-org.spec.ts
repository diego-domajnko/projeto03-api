import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org";
import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { CredenciaisInvalidasError } from "../errors/credencials-invalidas-error";
import { AuthOrgService } from "./auth-org";

describe("Uso de caso de autenticação de organização", () => {
  let orgRepository: InMemoryOrgRepository;
  let sut: AuthOrgService;

  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    sut = new AuthOrgService(orgRepository);

    orgRepository.items.push({
      email: "jhondoe@example.com",
      cep: "99999-999",
      endereco: "Teste",
      id: "1",
      password_hash: await hash("Teste12", 6),
      responsavel: "Jhon Doe",
      whatsapp: "(51)99999-9999",
      localizacao_id: 1,
      uf_id: 1,
    });
  });

  it("Deve ser possivel autenticar o usuário corretamente", async () => {
    const { org } = await sut.execute({
      email: "jhondoe@example.com",
      password: "Teste12",
    });

    expect(org.id).toEqual("1");
  });

  it("Não deve ser possivel autenticar o usuário com o email errado", async () => {
    expect(async () => {
      await sut.execute({
        email: "jhon@example.com",
        password: "Teste12",
      });
    }).rejects.toBeInstanceOf(CredenciaisInvalidasError);
  });

  it("Não deve ser possivel autenticar o usuário com a senha errada", async () => {
    expect(async () => {
      await sut.execute({
        email: "jhondoe@example.com",
        password: "Teste123456",
      });
    }).rejects.toBeInstanceOf(CredenciaisInvalidasError);
  });
});
