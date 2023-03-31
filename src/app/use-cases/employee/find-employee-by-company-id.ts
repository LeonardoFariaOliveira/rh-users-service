import { Injectable } from '@nestjs/common';
import { EmployeeProps } from '../../entities/employee';
import { EmployeeRepository } from '../../repositories/employeeRepository';

//Employee's response interface, is that we can return to a company when it requests the list of it employees
interface FindEmployeeByCompanyIdResponse {
  employees: EmployeeProps[];
}

@Injectable()
export class FindEmployeeByCompanyId {
  //Dependencies injection
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(companyId: string): Promise<FindEmployeeByCompanyIdResponse> {
    //Get the list of employees
    const employees = await this.employeeRepository.findEmployeesByCompanyId(
      companyId,
    );
    return {
      employees,
    };
  }
}
