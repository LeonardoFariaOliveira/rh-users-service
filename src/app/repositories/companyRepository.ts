import { CompanyProps } from '../entities/company';

export abstract class CompanyRepository {
  abstract create(company: CompanyProps): Promise<void>;
  abstract findMany(): Promise<CompanyProps>;
}
