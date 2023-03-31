import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '@app/repositories/employeeRepository';
import { PrismaService } from '../prisma.service';
import { PrismaEmployeeMapper } from '../mappers/prisma-employee-mapper';
import { Employee, EmployeeProps } from '@app/entities/employee';

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private prismaService: PrismaService) {}

  //Create an employee on database
  async create(employee: EmployeeProps): Promise<void> {
    await this.prismaService.employee.create({
      data: {
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
          create: {
            country: employee.address.countryValue,
            countryArea: employee.address.countryAreaValue,
            city: employee.address.cityValue,
            neighboor: employee.address.neighboorValue,
            street: employee.address.streetValue,
            number: employee.address.numberValue,
            id: employee.address.id,
          },
        },
        companyId: employee.companyId,
      },
    });
  }

  //Gets all the employees of a specific company from database by a company id
  async findEmployeesByCompanyId(companyId: string): Promise<Employee[]> {
    const employees = await this.prismaService.employee.findMany({
      select: {
        name: true,
        CPF: true,
        CTPS: true,
        job: true,
        sector: true,
        salary: true,
        birthDate: true,
        admissionDate: true,
        companyId: true,
        id: true,
        active: true,
        createdAt: true,
        photoUrl: true,
        updatedAt: true,
        address: true,
      },
      where: {
        companyId: companyId,
      },
    });
    return employees.map((employee) => {
      return PrismaEmployeeMapper.toDomain(employee, employee.address);
    });
  }

  // async update(user: User): Promise<User> {

  //     console.log("raw")
  //     const raw = PrismaUserMapper.toPrisma(user)

  //     const userUpdated =await this.prismaService.user.update({
  //         where:{
  //             id:user.id
  //         },
  //         data:raw
  //     })

  //     console.log(userUpdated)

  //     if(!userUpdated){
  //         console.log("usuario não encontrado")
  //         return null
  //     }

  //     return PrismaUserMapper.toDomain(userUpdated)

  // }

  // async turnOffUser(userId: string): Promise<void> {
  //     await this.prismaService.user.update({
  //         where:{
  //             id:userId
  //         },
  //         data:{
  //             active:false
  //         }
  //     })
  // }

  // async turnOnUser(userId: string): Promise<void> {
  //             await this.prismaService.user.update({
  //         where:{
  //             id:userId
  //         },
  //         data:{
  //             active:true
  //         }
  //     })
  // }
}
