//auth.service.ts
import { AdminProps } from '@app/entities/admin';
import { FindAdminByUser } from '@app/use-cases/admin/find-admin-by-user';
import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminAuthProvider {
  constructor(
    private readonly findAdminByUser: FindAdminByUser,
    private jwtService: JwtService,
  ) {}

  async adminValidate(user: string, password: string): Promise<string> {
    const { admin } = await this.findAdminByUser.execute(user);
    if (!admin) {
      throw new UnauthorizedException('Acesso ou Senha Inválidos');
    }
    if (admin.password === password) {
      return (await this.generateToken(admin)).access_token;
    }
    throw new UnauthorizedException('Acesso ou Senha Inválidos');
  }

  // async verifyToken(token: string): Promise<boolean> {
  //   if (!token) {
  //     throw new UnauthorizedException('Acesso não autorizado, sem token');
  //     return false;
  //   }
  //   console.log(this.jwtService.verify(token));
  //   return true;
  // }

  async generateToken(payload: AdminProps) {
    return {
      access_token: this.jwtService.signAsync(
        { user: payload.user },
        {
          secret: process.env.secret,
          expiresIn: '50s',
        },
      ),
    };
  }
}
