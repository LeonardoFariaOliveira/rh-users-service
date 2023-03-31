import { Injectable } from '@nestjs/common';
import { AdminProps } from '../../entities/admin';
import { AdminRepository } from '../../repositories/adminRepository';

//Admin's response interface, is that we can return to admin when he gets log in
interface FindAdminByUserResponse {
  admin: AdminProps;
}

@Injectable()
export class FindAdminByUser {
  //Dependencies injection
  constructor(private adminRepository: AdminRepository) {}

  async execute(user: string): Promise<FindAdminByUserResponse> {
    //Get the admin access
    const admin = await this.adminRepository.findAdminByUser(user);
    return {
      admin,
    };
  }
}
