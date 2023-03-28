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

  it('should not be able to create a company without an email', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);

    await expect(
      createCompany.execute({
        email: null,
        password: 'melaoazul',
        cnpj: '556750940',
        corporateName: 'Cyberswitch-Ltda',
        popularName: 'CyberSwitch',
        phoneNumber: '14998867061',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create a company without a password', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);

    await expect(
      createCompany.execute({
        email: 'contato@cyberswitch.dev',
        password: null,
        cnpj: '556750940',
        corporateName: 'Cyberswitch-Ltda',
        popularName: 'CyberSwitch',
        phoneNumber: '14998867061',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
      }),
    ).rejects.toThrow();
  });
  it('should not be able to create a company without a cnpj', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);

    await expect(
      createCompany.execute({
        email: 'contato@cyberswitch.dev',
        password: 'melaoazul',
        cnpj: null,
        corporateName: 'Cyberswitch-Ltda',
        popularName: 'CyberSwitch',
        phoneNumber: '14998867061',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
      }),
    ).rejects.toThrow();
  });
  it('should not be able to create a company without a corporate name', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);

    await expect(
      createCompany.execute({
        email: 'contato@cyberswitch.dev',
        password: 'melaoazul',
        cnpj: '556750940',
        corporateName: null,
        popularName: 'CyberSwitch',
        phoneNumber: '14998867061',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create a company without a popular name', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);

    await expect(
      createCompany.execute({
        email: 'contato@cyberswitch.dev',
        password: 'melaoazul',
        cnpj: '556750940',
        corporateName: 'Cyberswitch-Ltda',
        popularName: null,
        phoneNumber: '14998867061',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
      }),
    ).rejects.toThrow();
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
        phoneNumber: null,
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
      }),
    ).rejects.toThrow();
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
