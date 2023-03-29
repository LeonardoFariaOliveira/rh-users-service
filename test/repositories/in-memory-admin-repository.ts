import { AdminProps } from '@app/entities/admin';
import { AdminRepository } from '@app/repositories/adminRepository';

export class InMemoryAdminRepository implements AdminRepository {
  public admins: AdminProps[] = [];

  async create(admin: AdminProps) {
    this.admins.push(admin);
  }

  async findAdminByUser(user: string) {
    return this.admins.find((admin) => {
      return admin.user === user ? true : false;
    });
  }
}
