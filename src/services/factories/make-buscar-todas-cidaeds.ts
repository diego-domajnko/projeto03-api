import { LocalizacaoRepository } from "@/repositories/prisma/localizao";
import { BuscarTodasCidades } from "../localizacao/buscar-todas-cidades";

export function makeBuscarTodasCidadesService() {
  const localizacaoRepository = new LocalizacaoRepository();
  const sut = new BuscarTodasCidades(localizacaoRepository);

  return sut;
}
