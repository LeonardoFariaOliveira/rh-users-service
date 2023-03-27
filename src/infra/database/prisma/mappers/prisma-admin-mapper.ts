import { Admin, AdminProps } from '@app/entities/admin';
import { Admin as rawAdmin } from '@prisma/client';

export class PrismaAdminMapper {
  static toPrisma(admin: AdminProps) {
    return {
      id: admin.id,
      name: admin.name,
      user: admin.user,
      password: admin.password,
      active: admin.active,
    };
  }

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
