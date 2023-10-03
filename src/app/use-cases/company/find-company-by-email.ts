import { Injectable } from '@nestjs/common';
import { CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';

//Company's response interface, is that we can return to user when he gets log in or requets a specific company by email
interface FindCompanyByEmailResponse {
  company: CompanyProps;
}

@Injectable()
export class FindCompanyByEmail {
  //Dependencies injection
  constructor(private companyRepository: CompanyRepository) {}

  async execute(email: string): Promise<FindCompanyByEmailResponse> {
    if (!email) {
      throw new Error('We need an email to get a company access');
    }

    //Get the company access
    const company = await this.companyRepository.findCompanyByEmail(email);
    return {
      company,
    };
  }
}
