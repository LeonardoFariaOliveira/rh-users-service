//local.auth.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthProvider } from './admin-auth-provider';
import { AdminProps } from '@app/entities/admin';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminAuthService: AdminAuthProvider) {
    super();
  }

  async validate(username: string, password: string): Promise<string> {
    const adminToken = await this.adminAuthService.adminValidate(
      username,
      password,
    );
    if (!adminToken) {
      throw new UnauthorizedException();
    }
    return adminToken;
  }
}
