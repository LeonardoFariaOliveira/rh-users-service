import { EmployeeProps } from '@app/entities/employee';
import { EmployeeRepository } from '@app/repositories/employeeRepository';

export class InMemoryEmployeeRepository implements EmployeeRepository {
  findManyByCompanyId(companyId: string): Promise<EmployeeProps> {
    throw new Error('Method not implemented.');
  }
  public employees: EmployeeProps[] = [];

  async create(employee: EmployeeProps) {
    this.employees.push(employee);
  }
}
