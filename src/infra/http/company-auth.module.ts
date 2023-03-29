//auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CompanyAuthProvider } from './utils/company-auth-provider';
import { CompanyLocalStrategy } from './utils/company-local-auth';
import { FindCompanyByEmail } from '@app/use-cases/company/find-company-by-email';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [PassportModule, JwtModule, DatabaseModule],
  providers: [
    CompanyAuthProvider,
    FindCompanyByEmail,
    CompanyLocalStrategy,
    JwtService,
  ],
})
export class CompanyAuthModule {}
