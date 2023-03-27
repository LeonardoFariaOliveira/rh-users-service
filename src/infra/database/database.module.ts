import { Module } from '@nestjs/common';
import { AdminRepository } from '@app/repositories/adminRepository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
  ],
  exports: [AdminRepository],
})
export class DatabaseModule {}
