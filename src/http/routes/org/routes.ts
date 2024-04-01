import { authOrgController } from "@/http/controllers/org/auth-org";
import { criarOrgController } from "@/http/controllers/org/criar-org";
import { orgController } from "@/http/controllers/org/org";
import { refresh } from "@/http/controllers/org/refresh-token";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/", criarOrgController);
  app.post("/auth", authOrgController);
  app.post("/auth/refresh-token", refresh);
  app.get("/", { onRequest: [verifyJwt] }, orgController);
}
