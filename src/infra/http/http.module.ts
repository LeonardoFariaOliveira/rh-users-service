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

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController, CompanyController, EmployeeController],
  providers: [
    CreateAdmin,
    AdminAccessEncrypt,
    CreateCompany,
    FindCompanies,
    CreateEmployee,
    DateMask,
  ],
})
export class HTTPModule {}
