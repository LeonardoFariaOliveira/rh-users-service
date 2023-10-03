import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../repositories/companyRepository';

//Company's response interface, is that we can return to user when the admin deadactivate a company
type DeadactivateCompanyResponse = void;

@Injectable()
export class DeadactivateCompany {
  //Dependencies injection
  constructor(private companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<DeadactivateCompanyResponse> {
    if (!id) {
      throw new Error('Company must have an id to get update');
    }

    //Deadactivate the company
    await this.companyRepository.deadactivateCompany(id);
  }
}
