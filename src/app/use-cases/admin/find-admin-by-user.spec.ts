import { FindAdminByUser } from './find-admin-by-user';
import { CreateAdmin } from './create-admin';
import { InMemoryAdminRepository } from '@test/repositories/in-memory-admin-repository';

describe('Gets an admin by user', () => {
  it('should be able to get an admin by user', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);
    const findAdminByUser = new FindAdminByUser(adminRepository);

    await createAdmin.execute({
      name: 'Leonardo Faria',
      user: 'Mdpobsep Gbsjb',
      password: '1234567',
    });

    const { admin } = await findAdminByUser.execute('Mdpobsep Gbsjb');
    expect(admin.password).toEqual('1234567');
  });
});
