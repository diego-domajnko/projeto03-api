import { FastifyReply, FastifyRequest } from "fastify";

export async function logoutOrgController(_: FastifyRequest, res: FastifyReply) {
  return res
    .clearCookie("refreshToken")
    .status(200)
    .send({ message: "Usuário deslogado com sucesso" });
}
