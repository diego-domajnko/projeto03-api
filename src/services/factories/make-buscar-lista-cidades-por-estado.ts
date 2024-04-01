import { LocalizacaoRepository } from "@/repositories/prisma/localizao";
import { BuscarListaCidadesPorEstadoService } from "../localizacao/buscar-lista-cidades-por-estado";

export function makeBuscarListaCidadesPorEstadoService() {
  const localizacaoRepository = new LocalizacaoRepository();
  const sut = new BuscarListaCidadesPorEstadoService(localizacaoRepository);

  return sut;
}
