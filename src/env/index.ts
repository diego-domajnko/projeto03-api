import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Configuração de variáveis de ambiente inválida", _env.error.format());
  throw new Error("Configuração de variáveis de ambiente inválida");
}

export const env = _env.data;
