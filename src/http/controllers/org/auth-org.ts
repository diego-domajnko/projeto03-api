import { CredenciaisInvalidasError } from "@/services/errors/credencials-invalidas-error";
import { makeAuthOrgService } from "@/services/factories/make-auth-org";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authOrgController(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  const { email, password } = bodySchema.parse(req.body);

  try {
    const authOrgService = makeAuthOrgService();
    const { org } = await authOrgService.execute({ email, password });

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    );

    const refreshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: "3d",
        },
      }
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof CredenciaisInvalidasError) {
      res.status(401).send({ message: error.message });
    }

    throw error;
  }
}
