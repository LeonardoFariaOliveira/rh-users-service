import { InMemoryCompanyRepository } from '@test/repositories/in-memory-company-repository';
import { CreateCompany } from './create-company';
import { Address } from '@app/entities/address';

describe('Create a company', () => {
  it('should be able to create a company', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);

    await createCompany.execute({
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

    expect(companyRepository.companies).toHaveLength(1);
  });

  it('should not be able to create a company without a phone number', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);

    await expect(
      createCompany.execute({
        email: 'contato@cyberswitch.dev',
        password: 'melaoazul',
        cnpj: '556750940',
        corporateName: 'Cyberswitch-Ltda',
        popularName: 'CyberSwitch',
        phoneNumber: '14792369633',
        address: null,
      }),
    ).rejects.toThrow();
  });
});
