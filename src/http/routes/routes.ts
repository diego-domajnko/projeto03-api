import { FastifyInstance } from "fastify";
import { orgRoutes } from "./org/routes";
import { petRoutes } from "./pet/routes";

export async function routes(app: FastifyInstance) {
  app.register(orgRoutes, {
    prefix: "/org",
  });
  app.register(petRoutes, {
    prefix: "/pets",
  });
}
