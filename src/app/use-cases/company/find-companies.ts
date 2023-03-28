import { Injectable } from '@nestjs/common';
import { Company, CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';
import { Address } from '@app/entities/address';

//Company's request interface don't have any property 'cause it list all companies
type FindCompanyRequest = void;

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
