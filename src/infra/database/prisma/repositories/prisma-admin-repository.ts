/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AdminRepository } from "@app/repositories/adminRepository";
import { PrismaService } from "../prisma.service";
import { PrismaAdminMapper } from "../mappers/prisma-admin-mapper";
import { AdminProps } from "@app/entities/admin";


@Injectable()
export class PrismaAdminRepository implements AdminRepository{

    constructor(private prismaService: PrismaService){}

    //Create a admin on database
    async create(admin: AdminProps): Promise<void> {

        const raw = await PrismaAdminMapper.toPrisma(admin)
        await this.prismaService.admin.create({
            data:raw
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