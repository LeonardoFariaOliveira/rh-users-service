import { Injectable } from '@nestjs/common';
import { EmployeeProps } from '../../entities/employee';
import { EmployeeRepository } from '../../repositories/employeeRepository';

//Company's response interface, is that we can return to user when he requests a list of companies
interface FindEmployeeByCompanyIdResponse {
  employees: EmployeeProps[];
}

@Injectable()
export class FindEmployeeByCompanyId {
  //Dependencies injection
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(companyId: string): Promise<FindEmployeeByCompanyIdResponse> {
    //Get all the companies
    const employees = await this.employeeRepository.findEmployeesByCompanyId(
      companyId,
    );
    return {
      employees,
    };
  }
}
