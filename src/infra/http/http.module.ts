import { Module } from '@nestjs/common';
import { CreateAdmin } from '@app/use-cases/admin/create-admin';
import { DatabaseModule } from '@infra/database/database.module';
import { AdminController } from './controllers/admin.controller';
import { AccessCryptography } from './utils/access-cryptography';
import { CreateCompany } from '@app/use-cases/company/create-company';
import { CompanyController } from './controllers/company.controller';
import { FindCompanies } from '@app/use-cases/company/find-companies';
import { EmployeeController } from './controllers/employee.controller';
import { CreateEmployee } from '@app/use-cases/employee/create-employee';
import { DateMask } from './utils/date-mask';
import { FindEmployeeByCompanyId } from '@app/use-cases/employee/find-employee-by-company-id';
import { UserAccessAuthModule } from './user-access-auth.module';
import { AdminLocalStrategy } from './utils/admin-local-auth';
import { UserAccessAuthProvider } from './utils/user-access-auth-provider';
import { JwtService } from '@nestjs/jwt';
import { FindAdminByUser } from '@app/use-cases/admin/find-admin-by-user';
import { CompanyAuthModule } from './company-auth.module';
import { FindCompanyByEmail } from '@app/use-cases/company/find-company-by-email';
import { CompanyLocalStrategy } from './utils/company-local-auth';
import { EmailAuthProvider } from './utils/email-auth-provider';
import { DeadactivateCompany } from '@app/use-cases/company/deadactivate-company';
import { UpdateCompany } from '@app/use-cases/company/update-company';
import { IsCompanyActive } from '@app/use-cases/company/is-company-active';

@Module({
  imports: [DatabaseModule, UserAccessAuthModule, CompanyAuthModule],
  controllers: [AdminController, CompanyController, EmployeeController],
  providers: [
    CreateAdmin,
    AccessCryptography,
    CreateCompany,
    FindCompanies,
    CreateEmployee,
    DateMask,
    FindEmployeeByCompanyId,
    AdminLocalStrategy,
    UserAccessAuthProvider,
    JwtService,
    FindAdminByUser,
    CompanyLocalStrategy,
    EmailAuthProvider,
    FindCompanyByEmail,
    DeadactivateCompany,
    UpdateCompany,
    IsCompanyActive,
  ],
})
export class HTTPModule {}
