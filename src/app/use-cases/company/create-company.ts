import { Injectable } from '@nestjs/common';
import { Company, CompanyProps } from '../../entities/company';
import { CompanyRepository } from '../../repositories/companyRepository';
import { Address } from '@app/entities/address';

interface CreateCompanyRequest {
  email: string;
  password: string;
  comporateName: string;
  popularName: string;
  cnpj: string;
  photoUrl?: string;
  phoneNumber: string;
  address: Address;
}

interface CreateCompanyResponse {
  company: CompanyProps;
}

@Injectable()
export class CreateCompany {
  constructor(private companyRepository: CompanyRepository) {}

  async execute(request: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const {
      email,
      password,
      comporateName,
      popularName,
      phoneNumber,
      cnpj,
      address,
      photoUrl,
    } = request;

    if (!email) {
      throw new Error('Company should have an email name');
    }
    if (!password) {
      throw new Error('Company should have a password name');
    }
    if (!comporateName) {
      throw new Error('Company should have a corporate name');
    }
    if (!popularName) {
      throw new Error('Company should have a popular name');
    }
    if (!phoneNumber) {
      throw new Error('Company should have a phone number');
    }
    if (!cnpj) {
      throw new Error('Company should have a cnpj');
    }
    if (!address) {
      throw new Error('Company should have an address');
    }

    const company = new Company({
      email: email,
      password: email,
      comporateName: comporateName,
      popularName: popularName,
      cnpj: cnpj,
      phoneNumber: phoneNumber,
      photoUrl: photoUrl,
      address: new Address(
        address.id,
        address.countryValue,
        address.countryAreaValue,
        address.cityValue,
        address.neighboorValue,
        address.streetValue,
        address.numberValue,
      ),
    });

    await this.companyRepository.create(company);

    return {
      company,
    };
  }
}
