import { Ambiente, Energia, Idade, Independencia, Porte } from "@prisma/client";

export interface IPet {
  id: string;
  nome: string;
  sobre: string | null;
  idade: Idade | null;
  porte: Porte | null;
  energia: Energia | null;
  independencia: Independencia | null;
  ambiente: Ambiente | null;
  requisitos: string[] | null;
  org?: {
    id: string;
    whatsapp: string;
    responsavel: string;
    email: string;
    endereco: String;
    cep: string;
  };
}
