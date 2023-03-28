import { CompanyProps } from '@app/entities/company';
import { CompanyRepository } from '@app/repositories/companyRepository';

export class InMemoryCompanyRepository implements CompanyRepository {
  public companies: CompanyProps[] = [];

  async create(company: CompanyProps) {
    this.companies.push(company);
  }

  async findMany() {
    return this.companies;
  }
}
