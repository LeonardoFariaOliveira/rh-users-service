import { Injectable } from '@nestjs/common';
import { CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';

//Company's response interface, is that we can return to user when he requests a list of companies
interface FindCompanyResponse {
  companies: CompanyProps[];
}

@Injectable()
export class FindCompanies {
  //Dependencies injection
  constructor(private companyRepository: CompanyRepository) {}

  async execute(): Promise<FindCompanyResponse> {
    //Get all the companies
    const companies = await this.companyRepository.findMany();
    return {
      companies,
    };
  }
}
