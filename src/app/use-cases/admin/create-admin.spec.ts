import { InMemoryAdminRepository } from '@test/repositories/in-memory-admin-repository';
import { CreateAdmin } from './create-admin';

describe('Create an admin', () => {
  it('should be able to create an admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);

    await createAdmin.execute({
      name: 'Leonardo Faria',
      user: 'Mdpobsep Gbsjb',
      password: '1234567',
    });

    expect(adminRepository.admins).toHaveLength(1);
  });

  it('should not be able to create an admin without a name', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);

    await expect(
      createAdmin.execute({
        name: null,
        user: 'Mdpobsep Gbsjb',
        password: '1234567',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an admin without a user', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);

    await expect(
      createAdmin.execute({
        name: 'Leonardo Faria',
        user: null,
        password: '1234567',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to create an admin without a password', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);

    await expect(
      createAdmin.execute({
        name: 'Leonardo Faria',
        user: 'Mdpobsep Gbsjb',
        password: null,
      }),
    ).rejects.toThrow();
  });
});
