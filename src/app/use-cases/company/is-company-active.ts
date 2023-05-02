import { Injectable } from '@nestjs/common';
import { CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';

interface IsCompanyActiveResponse {
  isCompanyActive: boolean;
}

@Injectable()
export class IsCompanyActive {
  //Dependencies injection
  constructor(private companyRepository: CompanyRepository) {}

  async execute(email: string): Promise<IsCompanyActiveResponse> {
    //Get the company access
    const isCompanyActive = await this.companyRepository.isCompanyActive(email);
    return {
      isCompanyActive,
    };
  }
}
