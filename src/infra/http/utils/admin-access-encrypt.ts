import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

//Class that encrypt the name
export class AdminAccessEncrypt {
  private hash = 'aes-256-cbc';
  private iv = '5183666c72eec9e4';
  private key = 'bf3c199c2470cb477d907b1e0917c17b';

  async execute(text: string) {
    const cipher = createCipheriv(this.hash, this.key, this.iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    console.log('iv' + this.iv.toString());
    return {
      iv: this.iv.toString(),
      encryptedData: encrypted.toString('hex'),
    };
  }

  executeInverse(text: string) {
    const decipher = createDecipheriv(this.hash, this.key, this.iv);
    const decrypted = decipher.update(text, 'hex', 'utf8');
    return decrypted + decipher.final('utf8');
  }
}
