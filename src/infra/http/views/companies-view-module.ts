import { CompanyProps } from '@app/entities/company';

//This class we use to apply a mask on data before we return to user
export class CompanyViewModule {
  //This function gets al the data of a company and returns just the necessary
  // to build a clean table in the front-end
  static manyCompaniesToHTTP(company: CompanyProps) {
    return {
      id: company.id,
      email: company.email,
      corporateName: company.corporateName,
      popularName: company.popularName,
      phoneNumber: company.phoneNumber,
      createdAt: company.createdAt,
    };
  }
}
