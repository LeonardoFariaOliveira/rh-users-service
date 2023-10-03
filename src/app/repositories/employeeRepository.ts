import { EmployeeProps } from '../entities/employee';

//It's looks like a contract and we use to inject dependencies
export abstract class EmployeeRepository {
  abstract create(employee: EmployeeProps): Promise<void>;
  abstract findEmployeesByCompanyId(
    companyId: string,
  ): Promise<EmployeeProps[]>;
}
