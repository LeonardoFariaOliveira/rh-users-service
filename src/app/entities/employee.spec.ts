import { Address } from './address';
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
        admissionDate: new Date('27/03/2023'),
        birthDate: new Date('20/03/2003'),
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
      admissionDate: new Date('27/03/2023'),
      birthDate: new Date('20/03/2003'),
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
