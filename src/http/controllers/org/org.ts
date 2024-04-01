import { makeBuscarOrgService } from "@/services/factories/make-buscar-org";
import { FastifyReply, FastifyRequest } from "fastify";

export async function orgController(req: FastifyRequest, res: FastifyReply) {
  const id = req.user.sub;

  const orgService = makeBuscarOrgService();
  const { org } = await orgService.execute({ id });

  return res.status(200).send({ ...org, password_hash: undefined });
}
