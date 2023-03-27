import { createCipheriv, randomBytes } from 'crypto';

//Class that encrypt the name
export class AdminAccessEncrypt {
  private hash = 'aes-256-cbc';
  private iv = randomBytes(16);
  private key = randomBytes(32);

  async execute(name: string) {
    const cipher = createCipheriv(this.hash, this.key, this.iv);
    let encrypted = cipher.update(name);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: this.iv.toString('hex'),
      encryptedData: encrypted.toString('hex'),
    };
  }
}
