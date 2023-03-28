import { EmployeeProps } from '@app/entities/employee';
import { EmployeeRepository } from '@app/repositories/employeeRepository';

export class InMemoryEmployeeRepository implements EmployeeRepository {
  public employees: EmployeeProps[] = [];

  async create(employee: EmployeeProps) {
    this.employees.push(employee);
  }

  async findEmployeesByCompanyId(companyId: string): Promise<EmployeeProps[]> {
    return this.employees.filter((employee) => {
      return employee.companyId == companyId ? true : false;
    });
  }
}
