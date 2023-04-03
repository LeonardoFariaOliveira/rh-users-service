import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAdmin } from '@app/use-cases/admin/create-admin';
import { CreateAdminBody } from '../dtos/create-admin-body';
import { AccessCryptography } from '../utils/access-cryptography';
import { CreateAdminAuthBody } from '../dtos/create-admin-auth-body';
import { AdminLocalStrategy } from '../utils/admin-local-auth';

@Controller('v1')
export class AdminController {
  constructor(
    private createAdmin: CreateAdmin,
    private accessCryptography: AccessCryptography,
    private adminLocalStrategy: AdminLocalStrategy,
  ) {}

  //Path to create an admin
  @Post('03202327')
  async create(@Body() body: CreateAdminBody) {
    const { name } = body;

    //Encrypt the name of admin to generate an access and then a password
    const { encryptedData } = this.accessCryptography.encrypt(name);
    const user = encryptedData.slice(0, 9);
    const encrPass = this.accessCryptography.encrypt(user);
    const password = encrPass.encryptedData.slice(0, 9);
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
      return {
        //Bad request, status 400
        status: 400,
        message: e,
      };
    }
  }

  //Path to admin sign in
  @Post('auth/login')
  async login(@Body() body: CreateAdminAuthBody) {
    const { user, password } = body;
    const token = await this.adminLocalStrategy.validate(user, password);
    return {
      jwtToken: token,
    };
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
