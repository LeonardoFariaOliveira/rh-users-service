import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User('contato@cyberswitch', 'melaoazul');
    expect(user).toBeTruthy();
  });

  it('should be able to create a user with an id', () => {
    const user = new User('contato@cyberswitch', 'melaoazul', '555-6439');
    expect(user).toBeTruthy();
  });
});
