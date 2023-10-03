//local.auth.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAccessAuthProvider } from './user-access-auth-provider';
import { FindAdminByUser } from '@app/use-cases/admin/find-admin-by-user';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userAccessAuthProvider: UserAccessAuthProvider,
    private readonly findAdminByUser: FindAdminByUser,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<string> {
    const { admin } = await this.findAdminByUser.execute(username);
    if (!admin) {
      throw new UnauthorizedException('Acesso ou Senha Inválidos');
    }
    if (admin.password === password) {
      return (await this.userAccessAuthProvider.generateToken(admin))
        .access_token;
    }
    throw new UnauthorizedException('Acesso ou Senha Inválidos');
  }
}
