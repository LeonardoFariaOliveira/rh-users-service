//local.auth.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CompanyAuthProvider } from './company-auth-provider';
import { CompanyProps } from '@app/entities/company';

@Injectable()
export class CompanyLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private companyAuthService: CompanyAuthProvider) {
    super();
  }

  async validate(email: string, password: string): Promise<string> {
    const companyToken = await this.companyAuthService.companyValidate(
      email,
      password,
    );
    if (!companyToken) {
      throw new UnauthorizedException();
    }
    return companyToken;
  }
}
