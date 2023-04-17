//auth.service.ts
import { AdminProps } from '@app/entities/admin';
import { FindAdminByUser } from '@app/use-cases/admin/find-admin-by-user';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAccessAuthProvider {
  constructor(
    private readonly findAdminByUser: FindAdminByUser,
    private jwtService: JwtService,
  ) {}

  async generateToken(payload: AdminProps) {
    return {
      access_token: this.jwtService.signAsync(
        {
          id: payload.id,
          user: payload.user,
        },
        {
          secret: process.env.secret,
          expiresIn: '20s',
        },
      ),
    };
  }
}
