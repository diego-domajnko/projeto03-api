import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { routes } from "./http/routes/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "30m",
  },
});
app.register(fastifyCookie);
app.register(routes);
app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    res.status(400).send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // Here you can log the error to a service like Datalog/Sentry
  }

  return res.status(500).send({ message: "Internal server error." });
});
