import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateCompany } from '@app/use-cases/company/create-company';
import { CreateCompanyBody } from '../dtos/create-company-body';
import { Address } from '@app/entities/address';
import { FindCompanies } from '@app/use-cases/company/find-companies';
import { CompanyViewModule } from '../views/companies-view-module';
import { AuthGuard } from '../utils/auth-guard';
import { CompanyLocalStrategy } from '../utils/company-local-auth';
import { CreateCompanyAuthBody } from '../dtos/create-company-auth-body';
import { Response } from 'express';

@Controller('v1/companies')
export class CompanyController {
  constructor(
    private createCompany: CreateCompany,
    private findCompanies: FindCompanies,
    private companyLocalStrategy: CompanyLocalStrategy,
  ) {}

  //Path to create a company
  @UseGuards(AuthGuard)
  @Post('')
  async create(@Body() body: CreateCompanyBody, @Res() res: Response) {
    const {
      email,
      password,
      CNPJ,
      address,
      corporateName,
      phoneNumber,
      popularName,
      photoUrl,
    } = body;

    try {
      await this.createCompany.execute({
        email: email,
        password: password,
        corporateName: corporateName,
        popularName: popularName,
        cnpj: CNPJ,
        phoneNumber: phoneNumber,
        photoUrl: photoUrl,
        address: new Address(
          address.country,
          address.countryArea,
          address.city,
          address.neighboor,
          address.street,
          address.number,
        ),
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

  //Path to a company sign in
  @Post('auth/login')
  async login(@Body() body: CreateCompanyAuthBody, @Res() res: Response) {
    const { email, password } = body;
    try {
      const { token, id, popularName } =
        await this.companyLocalStrategy.validate(email, password);
      return {
        token: token,
        id: id,
        popularName: popularName,
      };
    } catch (e) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Email ou senha errados',
      });
    }
  }

  //Path to get the companies
  @UseGuards(AuthGuard)
  @Get('')
  async getCompanies() {
    const { companies } = await this.findCompanies.execute();
    return {
      count: companies.length,
      companies: companies.map((company) =>
        CompanyViewModule.manyCompaniesToHTTP(company),
      ),
    };
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
