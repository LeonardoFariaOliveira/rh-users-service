import { InMemoryCompanyRepository } from '@test/repositories/in-memory-company-repository';
import { CreateCompany } from './create-company';
import { Address } from '@app/entities/address';
import { DeadactivateCompany } from './deadactivate-company';
import { FindCompanyByEmail } from './find-company-by-email';

describe('Deadactivate a company', () => {
  it('should be able to deadactivate a company', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const deadactivateCompany = new DeadactivateCompany(companyRepository);
    const findCompanyByEmail = new FindCompanyByEmail(companyRepository);

    const company = await createCompany.execute({
      email: 'contato@cyberswitch.dev',
      password: 'melaoazul',
      cnpj: '556750940',
      corporateName: 'Cyberswitch-Ltda',
      popularName: 'CyberSwitch',
      phoneNumber: '11997867461',
      address: new Address(
        'Brasil',
        'São Paulo',
        'Marília',
        'Ouro Verde',
        'Mario Toloto',
        '412',
      ),
    });

    await deadactivateCompany.execute(company.company.id);
    const compan = await findCompanyByEmail.execute(company.company.email);

    expect(compan.company.active).toBeFalsy();
  });

  it('should not be able to deadactivate a company without and id', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const deadactivateCompany = new DeadactivateCompany(companyRepository);

    await expect(deadactivateCompany.execute(null)).rejects.toThrow();
  });
});
