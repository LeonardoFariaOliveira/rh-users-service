import { InMemoryCompanyRepository } from '@test/repositories/in-memory-company-repository';
import { FindCompanies } from './find-companies';
import { CreateCompany } from './create-company';
import { Address } from '@app/entities/address';

describe('Gets all the companies', () => {
  it('should be able to get all the companies', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const findCompanies = new FindCompanies(companyRepository);

    await createCompany.execute({
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

    const { companies } = await findCompanies.execute();

    expect(companies).toHaveLength(2);
  });
});
