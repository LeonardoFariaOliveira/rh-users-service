import { Injectable } from '@nestjs/common';
import { Admin, AdminProps } from '../../entities/admin';
import { AdminRepository } from '../../repositories/adminRepository';

interface CreateAdminRequest {
  name: string;
  user: string;
  password: string;
}

interface CreateAdminResponse {
  admin: AdminProps;
}

@Injectable()
export class CreateAdmin {
  constructor(private adminRepository: AdminRepository) {}

  async execute(request: CreateAdminRequest): Promise<CreateAdminResponse> {
    const { name, password, user } = request;

    if (!name) {
      throw new Error('Admin should have a name');
    }
    if (!user) {
      throw new Error('Admin should have an access');
    }
    if (!password) {
      throw new Error('Admin should have an access');
    }

    const admin = new Admin({
      name: name,
      user: user,
      password: password,
    });

    await this.adminRepository.create(admin);

    return {
      admin,
    };
  }
}
