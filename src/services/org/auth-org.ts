import { OrgRepository } from "@/repositories/org";
import { Org } from "@prisma/client";
import { compare } from "bcrypt";
import { CredenciaisInvalidasError } from "../errors/credencials-invalidas-error";

interface AuthOrgReq {
  email: string;
  password: string;
}

interface AuthOrgRes {
  org: Org;
}

export class AuthOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute({ email, password }: AuthOrgReq): Promise<AuthOrgRes> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new CredenciaisInvalidasError();
    }

    const senhaValida = await compare(password, org.password_hash);

    if (!senhaValida) {
      throw new CredenciaisInvalidasError();
    }

    return { org };
  }
}
