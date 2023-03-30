import { createCipheriv, createDecipheriv } from 'crypto';

//Class that encrypt the name
export class AdminAccessEncrypt {
  // private hash = 'aes-256-cbc';
  // private iv = '5183666c72eec9e4';
  // private key = 'bf3c199c2470cb477d907b1e0917c17b';

  async execute(text: string) {
    const cipher = createCipheriv(
      process.env.hash,
      process.env.key,
      process.env.iv,
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    console.log('iv' + process.env.iv.toString());
    return {
      iv: process.env.toString(),
      encryptedData: encrypted.toString('hex'),
    };
  }

  executeInverse(text: string) {
    const decipher = createDecipheriv(
      process.env.hash,
      process.env.key,
      process.env.iv,
    );
    const decrypted = decipher.update(text, 'hex', 'utf8');
    return decrypted + decipher.final('utf8');
  }
}
