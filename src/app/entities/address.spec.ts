import { Address } from './address';

describe('Users address', () => {
  it('should be able to create a user address', () => {
    const address = new Address(
      'Brasil',
      'São Paulo',
      'Ourinhos',
      'Ouro Verde',
      'Mario Toloto',
      '318',
    );
    expect(address).toBeTruthy();
  });
});
