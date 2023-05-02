import { CreateCompany } from './create-company';
import { InMemoryCompanyRepository } from '@test/repositories/in-memory-company-repository';
import { Address } from '@app/entities/address';
import { IsCompanyActive } from './is-company-active';
import { DeadactivateCompany } from './deadactivate-company';

describe('Gets a company status', () => {
  it('should be able to get if a company is active by email', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const isCompanyActive = new IsCompanyActive(companyRepository);

    const company = await createCompany.execute({
      email: 'contato@gedirh.dev',
      password: 'abacateamarelo',
      cnpj: '556750940',
      corporateName: 'GediRH-Ltda',
      popularName: 'GediRH',
      phoneNumber: '11997867461',
      address: new Address(
        'Brasil',
        'Paraná',
        'Londrina',
        'Ouro Verde',
        'Mario Toloto',
        '412',
      ),
    });

    const isCompanyDeadactive = await isCompanyActive.execute(
      'contato@gedirh.dev',
    );
    expect(isCompanyDeadactive).toBeTruthy();
  });

  it('should be able to get if a company is deadactive by id', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const deadactivateCompany = new DeadactivateCompany(companyRepository);
    const isCompanyActive = new IsCompanyActive(companyRepository);

    const company = await createCompany.execute({
      email: 'contato@gedirh.dev',
      password: 'abacateamarelo',
      cnpj: '556750940',
      corporateName: 'GediRH-Ltda',
      popularName: 'GediRH',
      phoneNumber: '11997867461',
      address: new Address(
        'Brasil',
        'Paraná',
        'Londrina',
        'Ouro Verde',
        'Mario Toloto',
        '412',
      ),
    });

    await deadactivateCompany.execute(company.company.id);

    const isCompanyDeadactive = await isCompanyActive.execute(
      'contato@gedirh.dev',
    );
    console.log(isCompanyDeadactive.isCompanyActive);
    expect(isCompanyDeadactive.isCompanyActive).toBeFalsy();
  });
});
