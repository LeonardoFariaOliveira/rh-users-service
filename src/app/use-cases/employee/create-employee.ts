import { Injectable } from '@nestjs/common';
import { Address } from '@app/entities/address';
import { Employee, EmployeeProps } from '@app/entities/employee';
import { EmployeeRepository } from '@app/repositories/employeeRepository';

//Employee's request interface, is that we need from user to create an employee, but in domain layer
interface CreateEmployeeRequest {
  name: string;
  CPF: string;
  CTPS: string;
  job: string;
  sector: string;
  photoUrl?: string;
  salary: number;
  admissionDate: Date;
  birthDate: Date;
  address: Address;
  companyId: string;
}

//Employee's response interface, is that we can return to user when he creates an employee, but in domain layer
interface CreateEmployeeResponse {
  employee: EmployeeProps;
}

@Injectable()
export class CreateEmployee {
  //Dependencies injection
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(
    request: CreateEmployeeRequest,
  ): Promise<CreateEmployeeResponse> {
    const {
      name,
      CPF,
      CTPS,
      job,
      sector,
      photoUrl,
      salary,
      admissionDate,
      birthDate,
      address,
      companyId,
    } = request;

    //Verify and throws errors
    if (!name) {
      throw new Error('Employee should have an name');
    }
    if (!CPF) {
      throw new Error('Employee should have a CPF');
    }
    if (!job) {
      throw new Error('Employee should have a job');
    }
    if (!CTPS) {
      throw new Error('Company should have a CTPS');
    }
    if (!sector) {
      throw new Error('Company should have a sector');
    }
    if (!salary) {
      throw new Error('Company should have a salary');
    }
    if (!admissionDate) {
      throw new Error('Company should have an admission date');
    }
    if (!birthDate) {
      throw new Error('Company should have a birth date');
    }
    if (!address) {
      throw new Error('Company should have an address');
    }
    if (!companyId) {
      throw new Error('Company should be part of a company');
    }

    //Creates a object employee
    const employee = new Employee({
      name: name,
      CPF: CPF,
      CTPS: CTPS,
      job: job,
      sector: sector,
      salary: salary,
      admissionDate: admissionDate,
      photoUrl: photoUrl,
      birthDate: birthDate,
      address: new Address(
        address.countryValue,
        address.countryAreaValue,
        address.cityValue,
        address.neighboorValue,
        address.streetValue,
        address.numberValue,
        address.id,
      ),
      companyId: companyId,
    });

    //Creates an employee
    await this.employeeRepository.create(employee);

    return {
      employee,
    };
  }
}
