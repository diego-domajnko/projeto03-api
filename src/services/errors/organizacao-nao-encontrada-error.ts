export class OrganizacaoNaoEncontradaError extends Error {
  constructor() {
    super("Organização não encontrada");
  }
}
