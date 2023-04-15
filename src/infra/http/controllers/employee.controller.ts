import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateEmployee } from '@app/use-cases/employee/create-employee';
import { CreateEmployeeBody } from '../dtos/create-employee-body';
import { Address } from '@app/entities/address';
import { DateMask } from '../utils/date-mask';
import { FindEmployeeByCompanyId } from '@app/use-cases/employee/find-employee-by-company-id';
import { EmployeesViewModule } from '../views/employees-view-module';
import { AuthGuard } from '../utils/auth-guard';
import { Response } from 'express';

@Controller('v1/employees')
export class EmployeeController {
  constructor(
    private createEmployee: CreateEmployee,
    private dateMask: DateMask,
    private findEmployeeByCompanyId: FindEmployeeByCompanyId,
  ) {}

  //Path to create an employee
  @UseGuards(AuthGuard)
  @Post('')
  async create(@Body() body: CreateEmployeeBody, @Res() res: Response) {
    const {
      name,
      cpf,
      ctps,
      job,
      sector,
      salary,
      address,
      photoUrl,
      companyId,
      admissionDate,
      birthDate,
    } = body;

    try {
      await this.createEmployee.execute({
        name: name,
        CPF: cpf,
        CTPS: ctps,
        job: job,
        sector: sector,
        photoUrl: photoUrl,
        salary: salary,
        admissionDate: await this.dateMask.execute(admissionDate),
        birthDate: await this.dateMask.execute(birthDate),
        address: new Address(
          address.country,
          address.countryArea,
          address.city,
          address.neighboor,
          address.street,
          address.number,
        ),
        companyId: companyId,
      });
      //Created, status 200
      return {
        message: 'Ok',
      };
    } catch (e) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Houve um erro, tente novamente',
      });
    }
  }

  //Path to get the companies
  @UseGuards(AuthGuard)
  @Get('/:companyId')
  async getEmployeesByCompanyId(
    @Param('companyId') companyId: string,
    @Res() res: Response,
  ) {
    try {
      const { employees } = await this.findEmployeeByCompanyId.execute(
        companyId,
      );
      return {
        data: {
          companyId: companyId,
          count: employees.length,
          employees: employees.map((employee) =>
            EmployeesViewModule.manyEmployeesToHTTP(employee),
          ),
        },
      };
    } catch (e) {
      return res.status(404).json({
        statusCode: 404,
        message: 'Empresa não encontrada',
      });
    }
  }

  //   @Patch('/:id/')
  //   async update(@Param('id') id: string, @Body() body: CreateUserBody) {
  //     const {
  //       email,
  //       password,
  //       firstName,
  //       lastName,
  //       CPF,
  //       phone,
  //       city,
  //       birthDate,
  //       country,
  //       photo_url,
  //     } = body;

  //     const { user } = await this.updateUserData.execute({
  //       id: id,
  //       email: email,
  //       password: password,
  //       firstName: firstName,
  //       lastName: lastName,
  //       CPF: CPF,
  //       phone: phone,
  //       city: city,
  //       birthDate: birthDate,
  //       country: country,
  //       photoUrl: photo_url,
  //     });

  //     console.log(user);

  //     return {
  //       user: UserViewModule.toHTTP(await user),
  //     };
  //   }

  //   @Patch('/:id/deadactivate')
  //   async turnOff(@Param('id') id: string) {
  //     await this.turnOffUser.execute({
  //       userId: id,
  //     });

  //     return {
  //       message: 'Ok',
  //     };
  //   }

  //   @Patch('/:id/activate')
  //   async turnOn(@Param('id') id: string) {
  //     await this.turnOnUser.execute({
  //       userId: id,
  //     });

  //     return {
  //       message: 'Ok',
  //     };
  //   }
}
