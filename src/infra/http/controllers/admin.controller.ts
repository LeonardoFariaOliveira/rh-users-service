import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateAdmin } from '@app/use-cases/admin/create-admin';
import { CreateAdminBody } from '../dtos/create-admin-body';
import { AccessCryptography } from '../utils/access-cryptography';
import { CreateAdminAuthBody } from '../dtos/create-admin-auth-body';
import { AdminLocalStrategy } from '../utils/admin-local-auth';
import { Response } from 'express';

@Controller('v1')
export class AdminController {
  constructor(
    private createAdmin: CreateAdmin,
    private accessCryptography: AccessCryptography,
    private adminLocalStrategy: AdminLocalStrategy,
  ) {}

  //Path to create an admin
  @Post('03202327')
  async create(@Body() body: CreateAdminBody, @Res() res: Response) {
    const { name } = body;

    //Encrypt the name of admin to generate an access and then a password
    const user = this.accessCryptography.encrypt(name).slice(0, 9);
    const password = this.accessCryptography.encrypt(user).slice(0, 9);
    try {
      const { admin } = await this.createAdmin.execute({
        name,
        user,
        password,
      });
      //Created, status 200
      return {
        admin: admin,
      };
    } catch (e) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Houve um erro, tente novamente',
      });
    }
  }

  //Path to admin sign in
  @Post('auth/login')
  async login(@Body() body: CreateAdminAuthBody, @Res() res: Response) {
    const { user, password } = body;
    try {
      const token = await this.adminLocalStrategy.validate(user, password);
      console.log(token);
      return res.status(200).json({
        token: token,
      });
    } catch (e) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Acesso ou senha errados',
      });
    }
  }

  //   @Get('/:id')
  //   async findOne(@Param('id') id: string) {
  //     const { user } = await this.getUserData.execute({
  //       userId: id,
  //     });

  //     return {
  //       user: UserViewModule.toHTTP(user),
  //     };
  //   }

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
