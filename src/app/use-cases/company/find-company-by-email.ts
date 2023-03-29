import { Injectable } from '@nestjs/common';
import { CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';

//Company's response interface, is that we can return to user when he requests a list of companies
interface FindCompanyByEmailResponse {
  company: CompanyProps;
}

@Injectable()
export class FindCompanyByEmail {
  //Dependencies injection
  constructor(private companyRepository: CompanyRepository) {}

  async execute(email: string): Promise<FindCompanyByEmailResponse> {
    //Get all the companies
    const company = await this.companyRepository.findCompanyByEmail(email);
    return {
      company,
    };
  }
}
