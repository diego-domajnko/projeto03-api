import { CidadeNaoEncontradaError } from "@/services/errors/cidade-nao-encontrada-error";

export async function fetchCep(cep: string) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const { localidade, uf } = await response.json();

  if (!localidade || !uf) {
    throw new CidadeNaoEncontradaError();
  }

  return {
    cidade: localidade,
    uf,
  };
}
