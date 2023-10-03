import { EmployeeProps } from '@app/entities/employee';
import { DateMask } from '../utils/date-mask';

//This class we use to apply a mask on data before we return to user
export class EmployeesViewModule {
  //This function gets al the data of a company and returns just the necessary
  // to build a clean table in the front-end
  static manyEmployeesToHTTP(employee: EmployeeProps) {
    const dateMask = new DateMask();
    return {
      id: employee.id,
      name: employee.name,
      job: employee.job,
      sector: employee.sector,
      birthDate: dateMask.executeInverse(employee.birthDate),
      admissionDate: dateMask.executeInverse(employee.admissionDate),
      salary: employee.salary,
    };
  }
}
