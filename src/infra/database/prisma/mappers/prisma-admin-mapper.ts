import { Admin, AdminProps } from '@app/entities/admin';
import { AdminAccessEncrypt } from '@infra/http/utils/admin-access-encrypt';
import { Admin as rawAdmin } from '@prisma/client';

export class PrismaAdminMapper {
  //Here we take data from domain layer ans mask to persistence layer
  static async toPrisma(admin: AdminProps) {
    const encrypter = new AdminAccessEncrypt();
    const enc = await encrypter.execute(admin.password);
    const password = enc.encryptedData;
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
