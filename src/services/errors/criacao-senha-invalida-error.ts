export class CriacaoSenhaInvalidaError extends Error {
  constructor() {
    super("A senha deve conter ao menos uma letra maiúscula, uma letra minúscula e um número.");
  }
}
