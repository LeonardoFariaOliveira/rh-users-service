import { FindEmployeeByCompanyId } from './find-employee-by-company-id';
import { CreateEmployee } from './create-employee';
import { Address } from '@app/entities/address';
import { InMemoryEmployeeRepository } from '@test/repositories/in-memory-employee-repository';

describe('Gets all the employees of a company', () => {
  it('should be able to get all the employees of a company', async () => {
    const employeeRepository = new InMemoryEmployeeRepository();
    const createEmployee = new CreateEmployee(employeeRepository);
    const findEmployees = new FindEmployeeByCompanyId(employeeRepository);

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

    await createEmployee.execute({
      name: 'Icaro Queiroz Recanello',
      CPF: '123-458-787-12',
      CTPS: '43f554okhv5h6',
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

    const { employees } = await findEmployees.execute('4645y5002e0k');

    expect(employees).toHaveLength(2);
  });
});
