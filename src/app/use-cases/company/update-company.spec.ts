import { InMemoryCompanyRepository } from '@test/repositories/in-memory-company-repository';
import { CreateCompany } from './create-company';
import { Address } from '@app/entities/address';
import { UpdateCompany } from './update-company';

describe('Update a company', () => {
  it('should be able to update a company', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const updateCompany = new UpdateCompany(companyRepository);

    const createdCompany = await createCompany.execute({
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

    const updatedCompany = await updateCompany.execute({
      id: createdCompany.company.id,
      cnpj: '444444444',
      corporateName: 'CyberswitchSA',
      popularName: 'CyberSwitchs',
      phoneNumber: '11997867462',
      address: new Address(
        'Brazil',
        'São Paulo',
        'Marília',
        'Ouro Verde',
        'Mario Toloto',
        '412',
        '36989606-352a-4fab-a58f-a60a3748d60c',
      ),
    });

    expect(updatedCompany.company).toEqual(
      expect.objectContaining({
        cnpj: '444444444',
        corporateName: 'CyberswitchSA',
        popularName: 'CyberSwitchs',
        phoneNumber: '11997867462',
        address: new Address(
          'Brazil',
          'São Paulo',
          'Marília',
          'Ouro Verde',
          'Mario Toloto',
          '412',
          '36989606-352a-4fab-a58f-a60a3748d60c',
        ),
      }),
    );
  });

  it('should not be able to update a company without and id', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const updateCompany = new UpdateCompany(companyRepository);

    await expect(
      updateCompany.execute({
        id: null,
        cnpj: '444444444',
        corporateName: 'CyberswitchSA',
        popularName: 'CyberSwitchs',
        phoneNumber: '11997867462',
        address: new Address(
          'Brazil',
          'São Paulo',
          'Marília',
          'Ouro Verde',
          'Mario Toloto',
          '412',
        ),
      }),
    ).rejects.toThrow();
  });
});
