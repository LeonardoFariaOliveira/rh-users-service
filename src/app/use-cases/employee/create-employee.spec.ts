import { InMemoryEmployeeRepository } from '@test/repositories/in-memory-employee-repository';
import { CreateEmployee } from './create-employee';
import { Address } from '@app/entities/address';

describe('Create an employee', () => {
  it('should be able to create an employee', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await createEmployee.execute({
      name: 'Leonardo Faria de Oliveira Souza',
      CPF: '123-456-789-12',
      CTPS: '43f554ggy5h6',
      job: 'Desenvolvedor',
      sector: 'TI',
      salary: 1000,
      admissionDate: new Date('2023-03-28'),
      birthDate: new Date('2003-07-22'),
      photoUrl: 'd4d4d4f4fg2.png',
      address: new Address(
        'Brasil',
        'São Paulo',
        'Ourinhos',
        'Ouro Verde',
        'Mario Toloto',
        '318',
      ),
      companyId: '4645y5002e0k',
    });

    expect(employeeRepository.employees).toHaveLength(1);
  });

  it('should not be able to create an employee without a name', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: null,
        CPF: '123-456-789-12',
        CTPS: '43f554ggy5h6',
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: 1000,
        admissionDate: new Date('2023-03-28'),
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });
  it('should not be able to create an employee without a CPF', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: null,
        CTPS: '43f554ggy5h6',
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: 1000,
        admissionDate: new Date('2023-03-28'),
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an employee without a CTPS', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: '123-456-789-12',
        CTPS: null,
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: 1000,
        admissionDate: new Date('2023-03-28'),
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an employee without a job', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: '123-456-789-12',
        CTPS: '43f554ggy5h6',
        job: null,
        sector: 'TI',
        salary: 1000,
        admissionDate: new Date('2023-03-28'),
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an employee without a sector', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: '123-456-789-12',
        CTPS: '43f554ggy5h6',
        job: 'Desenvolvedor',
        sector: null,
        salary: 1000,
        admissionDate: new Date('2023-03-28'),
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an employee without a salary', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: '123-456-789-12',
        CTPS: '43f554ggy5h6',
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: null,
        admissionDate: new Date('2023-03-28'),
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an employee without an admission date', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: '123-456-789-12',
        CTPS: '43f554ggy5h6',
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: 1000,
        admissionDate: null,
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an employee without a birth date', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: '123-456-789-12',
        CTPS: '43f554ggy5h6',
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: 1000,
        admissionDate: new Date('2023-03-28'),
        birthDate: null,
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an employee without an address', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: '123-456-789-12',
        CTPS: '43f554ggy5h6',
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: 1000,
        admissionDate: new Date('2023-03-28'),
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: null,
        companyId: '4645y5002e0k',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an employee without a company identification', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);

    await expect(
      createEmployee.execute({
        name: 'Leonardo Faria de Oliveira Souza',
        CPF: '123-456-789-12',
        CTPS: '43f554ggy5h6',
        job: 'Desenvolvedor',
        sector: 'TI',
        salary: 1000,
        admissionDate: new Date('2023-03-28'),
        birthDate: new Date('2003-07-22'),
        photoUrl: 'd4d4d4f4fg2.png',
        address: new Address(
          'Brasil',
          'São Paulo',
          'Ourinhos',
          'Ouro Verde',
          'Mario Toloto',
          '318',
        ),
        companyId: null,
      }),
    ).rejects.toThrow();
  });
});
