import { InMemoryUfRepository } from "@/repositories/in-memory/in-memory-uf";
import { beforeEach, describe, expect, it } from "vitest";
import { CriarUFService } from "./criar-uf";

describe("Uso de caso de criação de UF", () => {
  let sut: CriarUFService;
  let ufRepository: InMemoryUfRepository;

  beforeEach(() => {
    ufRepository = new InMemoryUfRepository();
    sut = new CriarUFService(ufRepository);
  });

  it("Deve criar uma UF", async () => {
    const { uf } = await sut.execute({ uf: "SP" });

    expect(uf.uf).toBe("SP");
  });

  it("Não deve ser possível criar duas UFs iguais", async () => {
    await sut.execute({ uf: "SP" });
    await sut.execute({ uf: "SP" });

    const ufs = await ufRepository.findAll();

    expect(ufs).toHaveLength(1);
  });
});
