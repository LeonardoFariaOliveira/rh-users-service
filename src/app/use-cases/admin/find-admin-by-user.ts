import { Injectable } from '@nestjs/common';
import { AdminProps } from '../../entities/admin';
import { AdminRepository } from '../../repositories/adminRepository';

//Company's response interface, is that we can return to user when he requests a list of companies
interface FindAdminByUserResponse {
  admin: AdminProps;
}

@Injectable()
export class FindAdminByUser {
  //Dependencies injection
  constructor(private adminRepository: AdminRepository) {}

  async execute(user: string): Promise<FindAdminByUserResponse> {
    //Get all the companies
    const admin = await this.adminRepository.findAdminByUser(user);
    return {
      admin,
    };
  }
}
