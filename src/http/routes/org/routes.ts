import { authOrgController } from "@/http/controllers/org/auth-org";
import { criarOrgController } from "@/http/controllers/org/criar-org";
import { logoutOrgController } from "@/http/controllers/org/logout-org";
import { orgController } from "@/http/controllers/org/org";
import { refresh } from "@/http/controllers/org/refresh-token";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";

export async function orgRoutes(app: FastifyInstance) {
  app.post("/", criarOrgController);
  app.post("/auth", authOrgController);
  app.patch("/auth/refresh-token", refresh);
  app.get("/", { onRequest: [verifyJwt] }, orgController);
  app.get("/logout", { onRequest: [verifyJwt] }, logoutOrgController);
}
