//auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthProvider } from '../utils/admin-auth-provider';
import { CreateAdminAuthBody } from '../dtos/create-admin-auth-body';

@Controller('v1/03202327')
export class AdminAuthController {
  constructor(private adminAuthProvider: AdminAuthProvider) {}

  @Post('auth/login')
  async login(@Body() body: CreateAdminAuthBody) {
    const { user, password } = body;
    const token = await this.adminAuthProvider.adminValidate(user, password);
    return {
      jwtToken: token,
    };
  }
}
