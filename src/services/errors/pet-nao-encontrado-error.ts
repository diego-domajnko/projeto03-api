export class PetNaoEncontradoError extends Error {
  constructor() {
    super(`Pet não encontrado`);
  }
}
