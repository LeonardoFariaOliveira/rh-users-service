import { AdminProps } from '../entities/admin';

//It's looks like a contract and we use to inject dependencies
export abstract class AdminRepository {
  abstract create(admin: AdminProps): Promise<void>;
  abstract findAdminByUser(user: string): Promise<AdminProps>;
}
