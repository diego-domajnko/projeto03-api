export class EmailJaExistenteError extends Error {
  constructor() {
    super("Email já cadastrado.");
  }
}
