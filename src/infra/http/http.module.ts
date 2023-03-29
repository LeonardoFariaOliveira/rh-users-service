import { Module } from '@nestjs/common';
import { CreateAdmin } from '@app/use-cases/admin/create-admin';
import { DatabaseModule } from '@infra/database/database.module';
import { AdminController } from './controllers/admin.controller';
import { AdminAccessEncrypt } from './utils/admin-access-encrypt';
import { CreateCompany } from '@app/use-cases/company/create-company';
import { CompanyController } from './controllers/company.controller';
import { FindCompanies } from '@app/use-cases/company/find-companies';
import { EmployeeController } from './controllers/employee.controller';
import { CreateEmployee } from '@app/use-cases/employee/create-employee';
import { DateMask } from './utils/date-mask';
import { FindEmployeeByCompanyId } from '@app/use-cases/employee/find-employee-by-company-id';
import { AdminAuthModule } from './admin-auth.module';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminLocalStrategy } from './utils/admin-local-auth';
import { AdminAuthProvider } from './utils/admin-auth-provider';
import { JwtService } from '@nestjs/jwt';
import { FindAdminByUser } from '@app/use-cases/admin/find-admin-by-user';
import { CompanyAuthModule } from './company-auth.module';
import { CompanyAuthController } from './controllers/company-auth.controller';
import { FindCompanyByEmail } from '@app/use-cases/company/find-company-by-email';
import { CompanyLocalStrategy } from './utils/company-local-auth';
import { CompanyAuthProvider } from './utils/company-auth-provider';

@Module({
  imports: [DatabaseModule, AdminAuthModule, CompanyAuthModule],
  controllers: [
    AdminController,
    CompanyController,
    EmployeeController,
    AdminAuthController,
    CompanyAuthController,
  ],
  providers: [
    CreateAdmin,
    AdminAccessEncrypt,
    CreateCompany,
    FindCompanies,
    CreateEmployee,
    DateMask,
    FindEmployeeByCompanyId,
    AdminLocalStrategy,
    AdminAuthProvider,
    JwtService,
    FindAdminByUser,
    CompanyLocalStrategy,
    CompanyAuthProvider,
    FindCompanyByEmail,
  ],
})
export class HTTPModule {}
