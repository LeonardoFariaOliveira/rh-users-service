//local.auth.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmailAuthProvider } from './email-auth-provider';
import { FindCompanyByEmail } from '@app/use-cases/company/find-company-by-email';
import { IsCompanyActive } from '@app/use-cases/company/is-company-active';

interface CompanyAuthProps {
  token: string;
  popularName: string;
  id: string;
}

@Injectable()
export class CompanyLocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private emailAuthProvider: EmailAuthProvider,
    private readonly findCompanyByEmail: FindCompanyByEmail,
    private readonly isCompanyActive: IsCompanyActive,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<CompanyAuthProps> {
    const { isCompanyActive } = await this.isCompanyActive.execute(email);
    console.log(isCompanyActive);
    if (!isCompanyActive) {
      throw new UnauthorizedException('Conta desativada');
    }
    console.log(email);
    const { company } = await this.findCompanyByEmail.execute(email);
    if (!company) {
      throw new UnauthorizedException('Email ou Senha Inválidos');
    }
    if (company.password === password) {
      const token = await (
        await this.emailAuthProvider.generateToken(company)
      ).access_token;
      // console.log(token);
      return {
        token: token,
        popularName: company.popularName,
        id: company.id,
      };
    }
    throw new UnauthorizedException('Email ou Senha Inválidos');
  }
}
