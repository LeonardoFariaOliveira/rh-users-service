import { Injectable } from '@nestjs/common';
import { CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';
import { Address } from '@app/entities/address';

interface UpdateCompanyRequest {
  id: string;
  corporateName?: string;
  popularName?: string;
  cnpj?: string;
  phoneNumber?: string;
  photoUrl?: string;
  address?: Address;
}

//Company's response interface, is that we can return to user when he creates a company, but in domain layer
interface UpdateCompanyResponse {
  company: CompanyProps;
}

@Injectable()
export class UpdateCompany {
  //Dependencies injection
  constructor(private companyRepository: CompanyRepository) {}

  async execute(company: UpdateCompanyRequest): Promise<UpdateCompanyResponse> {
    //Get the company access
    const updatedCompany = await this.companyRepository.updateCompany(company);

    return {
      company: updatedCompany,
    };
  }
}
