import { Address } from './address';
import { Company } from './company';

describe('Company', () => {
  it('should be able to create a company', () => {
    const company = new Company({
      email: 'contato@cyberswitch.dev',
      password: 'melaoazul',
      cnpj: '556750940',
      comporateName: 'Cyberswitch-Ltda',
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
    });
    expect(company).toBeTruthy();
  });

  it('should be able to create a company with an id', () => {
    const company = new Company(
      {
        email: 'contato@cyberswitch.dev',
        password: 'melaoazul',
        cnpj: '556750940',
        comporateName: 'Cyberswitch-Ltda',
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
      },
      '12345',
    );
    expect(company).toBeTruthy();
  });

  it('should be able to create a company with a photo url', () => {
    const company = new Company({
      email: 'contato@cyberswitch.dev',
      password: 'melaoazul',
      cnpj: '556750940',
      comporateName: 'Cyberswitch-Ltda',
      popularName: 'CyberSwitch',
      phoneNumber: '14998867061',
      photoUrl: "rhnjenejknvkerj.png",
      address: new Address(
        'Brasil',
        'São Paulo',
        'Ourinhos',
        'Ouro Verde',
        'Mario Toloto',
        '318',
      ),
    });
    expect(company).toBeTruthy();
  });
});
