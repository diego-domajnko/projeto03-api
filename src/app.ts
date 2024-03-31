import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refresh-token",
    signed: false,
  },
  sign: {
    expiresIn: "1d",
  },
});
app.register(fastifyCookie);
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
