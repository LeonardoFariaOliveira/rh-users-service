import { Address } from './address';
import { Company } from './company';
import { Employee } from './employee';

describe('Employee', () => {
  it('should be able to create a employee', () => {
    const employee = new Employee({
      name: 'Ícaro Queiroz Recanello',
      CPF: '555.345.875-34',
      CTPS: '677789546',
      job: 'Desenvolvedor',
      sector: 'TI',
      salary: 1000,
      admissionDate: new Date('27/03/2023'),
      birthDate: new Date('20/03/2003'),
      company: new Company({
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
      }),
      address: new Address(
        'Brasil',
        'São Paulo',
        'Ourinhos',
        'Ouro Verde',
        'Mario Toloto',
        '318',
      ),
    });
    expect(employee).toBeTruthy();
  });

  it('should be able to create a company with an id', () => {
    const employee = new Employee(
      {
        name: 'Ícaro Queiroz Recanello',
        CPF: '555.345.875-34',
        CTPS: '677789546',
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: 1000,
        admissionDate: new Date('2023-03-23'),
        birthDate: new Date('2023-03-23'),
        company: new Company({
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
        }),
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
      },
      '2334568',
    );
    expect(employee).toBeTruthy();
  });

  it('should be able to create a company with a photo url', () => {
    const employee = new Employee({
      name: 'Ícaro Queiroz Recanello',
      CPF: '555.345.875-34',
      CTPS: '677789546',
      job: 'Desenvolvedor',
      sector: 'TI',
      salary: 1000,
      admissionDate: new Date('2023-03-23'),
      birthDate: new Date('2023-03-23'),
      company: new Company({
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
      }),
      photoUrl: 'glemwlmfnfj.png',
      address: new Address(
        'Brasil',
        'São Paulo',
        'Ourinhos',
        'Ouro Verde',
        'Mario Toloto',
        '318',
      ),
    });
    expect(employee).toBeTruthy();
  });
});
