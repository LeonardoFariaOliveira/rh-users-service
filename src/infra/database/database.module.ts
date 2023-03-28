import { Module } from '@nestjs/common';
import { AdminRepository } from '@app/repositories/adminRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository';
import { CompanyRepository } from '@app/repositories/companyRepository';
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
    {
      provide: CompanyRepository,
      useClass: PrismaCompanyRepository,
    },
  ],
  exports: [AdminRepository, CompanyRepository],
})
export class DatabaseModule {}
