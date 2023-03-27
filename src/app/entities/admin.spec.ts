import { Admin } from './admin';

describe('Admin', () => {
  it('should be able to create a admin', () => {
    const admin = new Admin({
      name: 'Leonardo Faria',
      user: 'Mdpobsep Gbsjb',
      password: '1234567',
    });
    expect(admin).toBeTruthy();
  });

  it('should be able to create a company with an id', () => {
    const admin = new Admin(
      {
        name: 'Leonardo Faria',
        user: 'Mdpobsep Gbsjb',
        password: '1234567',
      },
      '53682001',
    );
    expect(admin).toBeTruthy();
  });
});
