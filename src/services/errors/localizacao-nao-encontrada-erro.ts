export class LocalizacaoNaoEncontradaError extends Error {
  constructor() {
    super("Localização não encontrada");
  }
}
