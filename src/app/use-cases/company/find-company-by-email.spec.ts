import { FindCompanyByEmail } from './find-company-by-email';
import { CreateCompany } from './create-company';
import { InMemoryCompanyRepository } from '@test/repositories/in-memory-company-repository';
import { Address } from '@app/entities/address';

describe('Gets a company by email', () => {
  it('should be able to get a company by email', async () => {
    const companyRepository = new InMemoryCompanyRepository();
    const createCompany = new CreateCompany(companyRepository);
    const findCompanyByEmail = new FindCompanyByEmail(companyRepository);

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

    const { company } = await findCompanyByEmail.execute('contato@gedirh.dev');
    expect(company.password).toEqual('abacateamarelo');
  });
});
