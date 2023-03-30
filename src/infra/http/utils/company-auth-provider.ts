//auth.service.ts
import { AdminProps } from '@app/entities/admin';
import { CompanyProps } from '@app/entities/company';
import { FindCompanyByEmail } from '@app/use-cases/company/find-company-by-email';
import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompanyAuthProvider {
  constructor(
    private readonly findCompanyByEmail: FindCompanyByEmail,
    private jwtService: JwtService,
  ) {}

  async companyValidate(email: string, password: string): Promise<string> {
    const { company } = await this.findCompanyByEmail.execute(email);
    if (!company) {
      throw new UnauthorizedException('Email ou Senha Inválidos');
    }
    if (company.password === password) {
      return (await this.generateToken(company)).access_token;
    }
    throw new UnauthorizedException('Email ou Senha Inválidos');
  }

  // async verifyToken(token: string): Promise<boolean> {
  //   if (!token) {
  //     throw new UnauthorizedException('Acesso não autorizado, sem token');
  //     return false;
  //   }
  //   console.log(this.jwtService.verify(token));
  //   return true;
  // }

  async generateToken(payload: CompanyProps) {
    return {
      access_token: this.jwtService.signAsync(
        {
          email: payload.email,
        },
        {
          secret: process.env.secret,
          expiresIn: '50s',
        },
      ),
    };
  }
}
