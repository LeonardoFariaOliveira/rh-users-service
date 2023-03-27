import { Module } from '@nestjs/common';
import { CreateAdmin } from '@app/use-cases/admin/create-admin';
import { DatabaseModule } from '@infra/database/database.module';
import { AdminController } from './controllers/admin.controller';
import { AdminAccessEncrypt } from './utils/admin-access-encrypt';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [CreateAdmin, AdminAccessEncrypt],
})
export class HTTPModule {}
