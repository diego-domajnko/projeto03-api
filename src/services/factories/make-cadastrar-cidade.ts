import { LocalizacaoRepository } from "@/repositories/prisma/localizao";
import { CadastrarCidadeService } from "../localizacao/cadastrar-cidade";

export function makeCadastrarCidadeService() {
  const localizacaoRepository = new LocalizacaoRepository();
  const sut = new CadastrarCidadeService(localizacaoRepository);

  return sut;
}
