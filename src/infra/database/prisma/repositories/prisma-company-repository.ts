/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CompanyRepository } from "@app/repositories/companyRepository";
import { PrismaService } from "../prisma.service";
import { PrismaCompanyMapper } from "../mappers/prisma-company-mapper";
import { Company, CompanyProps } from "@app/entities/company";
import { Address } from "@app/entities/address";


@Injectable()
export class PrismaCompanyRepository implements CompanyRepository{

    constructor(private prismaService: PrismaService){}

    //Create a company on database
    async create(company: CompanyProps): Promise<void> {

        const raw = await PrismaCompanyMapper.toPrisma(company)
        await this.prismaService.company.create({
            data:{
                id: raw.id,
                email: raw.email,
                password: raw.password,
                corporateName: raw.corporateName,
                popularName: raw.popularName,
                CNPJ: raw.CNPJ,
                phoneNumber: raw.phoneNumber,
                photoUrl: raw.photoUrl,
                address:{
                    create:{
                        id: raw.address.id,
                        country:raw.address.country,
                        countryArea: raw.address.countryArea,
                        city:raw.address.city,
                        neighboor: raw.address.neighboor,
                        street: raw.address.street,
                        number: raw.address.number,
                    }
                }
            }
        })
    }

    //Gets all the companies
    async findMany(): Promise<Company[]> {
        const companies = await this.prismaService.company.findMany({
            select:{
                email:true,
                popularName:true,
                corporateName:true,
                password:true,
                CNPJ:true,
                createdAt:true,
                address:true,
                id:true,
                active:true,
                phoneNumber:true,
                photoUrl:true,
                updatedAt:true
            },
            orderBy:{
                createdAt: "desc"
            }
        })

        return companies.map((company)=> {
                return PrismaCompanyMapper.toDomain(company, company.address)
        })
            
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