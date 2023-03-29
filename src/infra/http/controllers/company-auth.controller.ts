//auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CompanyAuthProvider } from '../utils/company-auth-provider';
import { CreateCompanyAuthBody } from '../dtos/create-company-auth-body';

@Controller('v1/companies')
export class CompanyAuthController {
  constructor(private companyAuthProvider: CompanyAuthProvider) {}

  @Post('auth/login')
  async login(@Body() body: CreateCompanyAuthBody) {
    const { email, password } = body;
    const token = await this.companyAuthProvider.companyValidate(
      email,
      password,
    );
    return {
      jwtToken: token,
    };
  }
}
