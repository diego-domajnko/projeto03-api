export class CidadeNaoEncontradaError extends Error {
  constructor() {
    super("Cidade não encontrada");
  }
}
