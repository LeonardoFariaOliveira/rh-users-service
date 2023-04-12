import { CompanyProps } from '../entities/company';

//It's looks like a contract and we use to inject dependencies
export abstract class CompanyRepository {
  abstract create(company: CompanyProps): Promise<void>;
  abstract findMany(): Promise<CompanyProps[]>;
  abstract findCompanyByEmail(email: string): Promise<CompanyProps>;
  // abstract deadactivateCompany(id: string): Promise<void>;
}
