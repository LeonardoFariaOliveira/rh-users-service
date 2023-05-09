import { CompanyProps, CompanyUpdateProps } from '@app/entities/company';
import { CompanyRepository } from '@app/repositories/companyRepository';

export class InMemoryCompanyRepository implements CompanyRepository {
  public companies: CompanyProps[] = [];

  async create(company: CompanyProps) {
    this.companies.push(company);
  }

  async findMany() {
    return this.companies;
  }

  async findCompanyByEmail(email: string): Promise<CompanyProps> {
    return this.companies.find((company) => {
      return company.email === email ? true : false;
    });
  }

  async deadactivateCompany(id: string): Promise<void> {
    const company = this.companies.find((company) => {
      return company.id === id ? true : false;
    });
    company.active = false;
  }

  async updateCompany(company: CompanyUpdateProps): Promise<CompanyProps> {
    const updatedCompany = this.companies.find((company) => {
      return company.id === company.id ? true : false;
    });
    updatedCompany.cnpj = company.cnpj;
    updatedCompany.corporateName = company.corporateName;
    updatedCompany.phoneNumber = company.phoneNumber;
    updatedCompany.popularName = company.popularName;
    updatedCompany.photoUrl = company.photoUrl;
    updatedCompany.address = company.address;
    return updatedCompany;
  }

  async isCompanyActive(email: string): Promise<boolean> {
    const company = this.companies.find((company) => {
      return company.email === email ? true : false;
    });
    return company.active;
  }

  async findCompanyById(companyId: string): Promise<CompanyProps> {
    return this.companies.find((company) => {
      return company.id === companyId ? true : false;
    });
  }
}
