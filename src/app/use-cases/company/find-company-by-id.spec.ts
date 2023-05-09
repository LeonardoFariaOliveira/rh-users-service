import { FindCompanyById } from './find-company-by-id';
import { CreateCompany } from './create-company';
import { InMemoryCompanyRepository } from '@test/repositories/in-memory-company-repository';
import { Address } from '@app/entities/address';

describe('Gets a company by id', () => {
  it('should be able to get a company by id', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const findCompanyById = new FindCompanyById(companyRepository);

    const c = await createCompany.execute({
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

    const { company } = await findCompanyById.execute(c.company.id);
    console.log(company);
    expect(company).toEqual(c.company);
  });

  it('should not be able to get a company without an id', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const findCompanyById = new FindCompanyById(companyRepository);

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

    await expect(findCompanyById.execute('')).rejects.toThrow();
  });

  it('should not be able to get a company without a unknown id', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const findCompanyById = new FindCompanyById(companyRepository);

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

    await expect(findCompanyById.execute('unknownId')).rejects.toThrow();
  });
});
