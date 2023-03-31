import { Admin, AdminProps } from '@app/entities/admin';
import { AccessCryptography } from '@infra/http/utils/access-cryptography';
import { Admin as rawAdmin } from '@prisma/client';

export class PrismaAdminMapper {
  static accessCryptography = new AccessCryptography();

  //Here we take data from domain layer ans mask to persistence layer
  static async toPrisma(admin: AdminProps) {
    const enc = this.accessCryptography.encrypt(admin.password);
    const password = enc.encryptedData.slice(0, 9);
    return {
      id: admin.id,
      name: admin.name,
      user: admin.user,
      password: password,
      active: admin.active,
    };
  }

  //Here we take data from persistence layer ans mask to domain layer
  static toDomain(raw: rawAdmin) {
    return new Admin(
      {
        name: raw.name,
        user: raw.user,
        password: raw.password,
        active: raw.active,
      },
      raw.id,
    );
  }
}
