import { CompanyProps } from '@app/entities/company';
import { AccessCryptography } from '../utils/access-cryptography';

//This class we use to apply a mask on data before we return to user
export class CompanyViewModule {
  //This function gets al the data of a company and returns just the necessary
  // to build a clean table in the front-end
  static manyCompaniesToHTTP(company: CompanyProps) {
    const accessCryptography = new AccessCryptography();
    const password = accessCryptography.decrypt(company.password);
    console.log(company.active);
    return {
      id: company.id,
      email: company.email,
      corporateName: company.corporateName,
      cnpj: company.cnpj,
      password: password,
      popularName: company.popularName,
      phoneNumber: company.phoneNumber,
      address: company.address,
      createdAt: company.createdAt,
      active: company.active,
    };
  }
}
