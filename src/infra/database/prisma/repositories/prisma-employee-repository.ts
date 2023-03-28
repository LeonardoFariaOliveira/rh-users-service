import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '@app/repositories/employeeRepository';
import { PrismaService } from '../prisma.service';
import { PrismaEmployeeMapper } from '../mappers/prisma-employee-mapper';
import { Employee, EmployeeProps } from '@app/entities/employee';
import { Address } from '@app/entities/address';

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private prismaService: PrismaService) {}
  findManyByCompanyId(companyId: string): Promise<EmployeeProps> {
    throw new Error('Method not implemented.');
  }

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

  //Gets all the companies
  //   async findMany(): Promise<Company[]> {
  //     const companies = await this.prismaService.company.findMany({
  //       select: {
  //         email: true,
  //         popularName: true,
  //         corporateName: true,
  //         password: true,
  //         CNPJ: true,
  //         createdAt: true,
  //         address: true,
  //         id: true,
  //         active: true,
  //         phoneNumber: true,
  //         photoUrl: true,
  //         updatedAt: true,
  //       },
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //     });

  //     return companies.map((company) => {
  //       return PrismaCompanyMapper.toDomain(company, company.address);
  //     });
  //   }

  // async findById(userId: string): Promise<User> {
  //     const user = await this.prismaService.user.findUnique({
  //         where:{
  //             id: userId
  //         }
  //     })

  //     if(!user){
  //         return null
  //     }

  //     return PrismaUserMapper.toDomain(user)
  // }

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
