import { LocalizacaoRepository } from "@/repositories/prisma/localizao";
import { BuscarCidadeService } from "../localizacao/buscar-cidade";

export function makeBuscarCidadeService() {
  const localizacaoRepository = new LocalizacaoRepository();
  const sut = new BuscarCidadeService(localizacaoRepository);

  return sut;
}
