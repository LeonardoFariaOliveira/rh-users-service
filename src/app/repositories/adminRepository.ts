import { Admin, AdminProps } from '../entities/admin';

export abstract class AdminRepository{
    abstract create(admin:AdminProps): Promise<void>
}