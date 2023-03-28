import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '@app/repositories/companyRepository';
import { PrismaService } from '../prisma.service';
import { PrismaCompanyMapper } from '../mappers/prisma-company-mapper';
import { Company, CompanyProps } from '@app/entities/company';
import { AdminAccessEncrypt } from '@infra/http/utils/admin-access-encrypt';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
  constructor(private prismaService: PrismaService) {}

  //Create a company on database
  async create(company: CompanyProps): Promise<void> {
    const encrypter = new AdminAccessEncrypt();
    const enc = await encrypter.execute(company.password);
    const password = enc.encryptedData;
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

  //Gets all the companies
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
    });

    return companies.map((company) => {
      return PrismaCompanyMapper.toDomain(company, company.address);
    });
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
