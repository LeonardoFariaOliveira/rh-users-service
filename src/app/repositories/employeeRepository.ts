import { EmployeeProps } from '../entities/employee';

export abstract class EmployeeRepository {
  abstract create(employee: EmployeeProps): Promise<void>;
  abstract findManyByCompanyId(cId: string): Promise<EmployeeProps>;
}
