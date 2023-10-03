//auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserAccessAuthProvider } from './utils/user-access-auth-provider';
import { AdminLocalStrategy } from './utils/admin-local-auth';
import { FindAdminByUser } from '@app/use-cases/admin/find-admin-by-user';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [PassportModule, JwtModule, DatabaseModule],
  providers: [
    UserAccessAuthProvider,
    FindAdminByUser,
    AdminLocalStrategy,
    JwtService,
  ],
})
export class UserAccessAuthModule {}
