import { Injectable } from '@nestjs/common';
import { CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';

//Company's response interface, is that we can return to user when he gets log in or requets a specific company by email
type DeadactivateCompanyResponse = void;

@Injectable()
export class FindCompanyByEmail {
  //Dependencies injection
  constructor(private companyRepository: CompanyRepository) {}

  // async execute(id: string): Promise<DeadactivateCompanyResponse> {
  //   //Get the company access
  //   await this.companyRepository.deadactivateCompany(id);
  // }
}
