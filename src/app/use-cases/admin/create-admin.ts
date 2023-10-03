import { Injectable } from '@nestjs/common';
import { Admin, AdminProps } from '../../entities/admin';
import { AdminRepository } from '../../repositories/adminRepository';

//Admins request interface, is what we need from user to create an admin, but in domain layer
interface CreateAdminRequest {
  name: string;
  user: string;
  password: string;
}

//Admins response interface, is what we can return to user when he creates an admin, but in domain layer
interface CreateAdminResponse {
  admin: AdminProps;
}

@Injectable()
export class CreateAdmin {
  //Dependencies injection
  constructor(private adminRepository: AdminRepository) {}

  async execute(request: CreateAdminRequest): Promise<CreateAdminResponse> {
    const { name, password, user } = request;

    //Verify and throws errors
    if (!name) {
      throw new Error('Admin should have a name');
    }
    if (!user) {
      throw new Error('Admin should have an access');
    }
    if (!password) {
      throw new Error('Admin should have an access');
    }

    //Creates an object admin
    const admin = new Admin({
      name: name,
      user: user,
      password: password,
    });

    //Creates an admin
    await this.adminRepository.create(admin);

    return {
      admin,
    };
  }
}
