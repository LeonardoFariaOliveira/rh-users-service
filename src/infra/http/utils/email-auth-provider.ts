import { CompanyProps } from '@app/entities/company';
import { FindCompanyByEmail } from '@app/use-cases/company/find-company-by-email';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailAuthProvider {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: CompanyProps) {
    return {
      access_token: this.jwtService.signAsync(
        {
          email: payload.email,
        },
        {
          secret: process.env.secret,
          expiresIn: '28800s',
        },
      ),
    };
  }
}
