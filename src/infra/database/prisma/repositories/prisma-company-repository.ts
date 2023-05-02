import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '@app/repositories/companyRepository';
import { PrismaService } from '../prisma.service';
import { PrismaCompanyMapper } from '../mappers/prisma-company-mapper';
import {
  Company,
  CompanyProps,
  CompanyUpdateProps,
} from '@app/entities/company';
import { AccessCryptography } from '@infra/http/utils/access-cryptography';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prismaService: PrismaService) {}

  private accessCryptography = new AccessCryptography();

  //Create a company on database
  async create(company: CompanyProps): Promise<void> {
    const password = this.accessCryptography.encrypt(company.password);
    await this.prismaService.company.create({
      data: {
        id: company.id,
        email: company.email,
        password: password,
        corporateName: company.corporateName,
        popularName: company.popularName,
        CNPJ: company.cnpj,
        phoneNumber: company.phoneNumber,
        photoUrl: company.photoUrl,
        address: {
          create: {
            country: company.address.countryValue,
            countryArea: company.address.countryAreaValue,
            city: company.address.cityValue,
            neighboor: company.address.neighboorValue,
            street: company.address.streetValue,
            number: company.address.numberValue,
            id: company.address.id,
          },
        },
      },
    });
  }

  //Gets all the companies from database
  async findMany(): Promise<Company[]> {
    const companies = await this.prismaService.company.findMany({
      select: {
        email: true,
        popularName: true,
        corporateName: true,
        password: true,
        CNPJ: true,
        createdAt: true,
        address: true,
        id: true,
        active: true,
        phoneNumber: true,
        photoUrl: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        active: true,
      },
    });

    return companies.map((company) => {
      return PrismaCompanyMapper.toDomain(company, company.address);
    });
  }

  //Gets a company from database by email
  async findCompanyByEmail(email: string): Promise<CompanyProps> {
    const company = await this.prismaService.company.findUnique({
      select: {
        email: true,
        popularName: true,
        corporateName: true,
        password: true,
        CNPJ: true,
        createdAt: true,
        address: true,
        id: true,
        active: true,
        phoneNumber: true,
        photoUrl: true,
        updatedAt: true,
      },
      where: {
        email: email,
        // active: true,
      },
    });

    return PrismaCompanyMapper.toDomainLogin(company, company.address);
  }

  async deadactivateCompany(id: string): Promise<void> {
    await this.prismaService.company.update({
      where: {
        id: id,
      },
      data: {
        active: false,
      },
    });
  }

  async updateCompany(company: CompanyUpdateProps): Promise<CompanyProps> {
    const updatedCompany = await this.prismaService.company.update({
      select: {
        email: true,
        popularName: true,
        corporateName: true,
        password: true,
        CNPJ: true,
        createdAt: true,
        address: true,
        id: true,
        active: true,
        phoneNumber: true,
        photoUrl: true,
        updatedAt: true,
      },
      where: {
        id: company.id,
      },
      data: {
        popularName: company.popularName,
        corporateName: company.corporateName,
        phoneNumber: company.phoneNumber,
        CNPJ: company.cnpj,
        address: {
          update: {
            country: company.address.countryValue,
            countryArea: company.address.countryAreaValue,
            city: company.address.cityValue,
            neighboor: company.address.neighboorValue,
            street: company.address.streetValue,
            number: company.address.numberValue,
          },
        },
      },
    });

    return PrismaCompanyMapper.toDomainLogin(
      updatedCompany,
      updatedCompany.address,
    );
  }

  async isCompanyActive(email: string): Promise<boolean> {
    const company = await this.prismaService.company.findUnique({
      select: {
        active: true,
      },
      where: {
        email: email,
        // active: true,
      },
    });
    return company.active;
  }

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
