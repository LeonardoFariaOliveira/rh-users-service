import { Injectable } from '@nestjs/common';
import { CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';

//Company's response interface, is that we can return to user when he gets log in or requets a specific company by email
interface FindCompanyByIdResponse {
  company: CompanyProps;
}

@Injectable()
export class FindCompanyById {
  //Dependencies injection
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<FindCompanyByIdResponse> {
    if (!id) {
      throw new Error('We need an id to get a company');
    }

    //Get the company data
    const company = await this.companyRepository.findCompanyById(id);
    if (!company) {
      throw new Error('Company not found');
    }
    return {
      company,
    };
  }
}
