import { Admin, AdminProps } from '@app/entities/admin';
import { Admin as rawAdmin } from '@prisma/client';

export class PrismaAdminMapper {
  //Here we take data from domain layer ans mask to persistence layer
  static toPrisma(admin: AdminProps) {
    return {
      id: admin.id,
      name: admin.name,
      user: admin.user,
      password: admin.password,
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
