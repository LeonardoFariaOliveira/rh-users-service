import { Address } from '@app/entities/address';
import { Employee, EmployeeProps } from '@app/entities/employee';
import { Employee as rawCompany } from '@prisma/client';
import { Address as rawAddress } from '@prisma/client';

export class PrismaEmployeeMapper {
  //Here we take data from domain layer ans mask to persistence layer
  static async toPrisma(employee: EmployeeProps) {
    return {
      id: employee.id,
      name: employee.name,
      CPF: employee.CPF,
      CTPS: employee.CTPS,
      job: employee.job,
      sector: employee.sector,
      salary: employee.salary,
      admissionDate: employee.admissionDate,
      birthDate: employee.birthDate,
      photoUrl: employee.photoUrl,
      address: {
        create: {},
      },
      companyId: '',
    };
  }

  //Here we take data from persistence layer ans mask to domain layer
  static toDomain(raw: rawCompany, rawAddress: rawAddress): Employee {
    return new Employee(
      {
        name: raw.name,
        CPF: raw.CPF,
        CTPS: raw.CTPS,
        job: raw.job,
        sector: raw.sector,
        salary: parseFloat(raw.salary.toString()),
        birthDate: raw.birthDate,
        admissionDate: raw.admissionDate,
        companyId: raw.companyId,
        address: new Address(
          rawAddress.country,
          rawAddress.countryArea,
          rawAddress.city,
          rawAddress.neighboor,
          rawAddress.street,
          rawAddress.number,
        ),
      },
      raw.id,
    );
  }
}
