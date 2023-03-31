import { createCipheriv, createDecipheriv } from 'crypto';

//Class that encrypt the name
export class AccessCryptography {
  encrypt(text: string) {
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

  decrypt(text: string) {
    const decipher = createDecipheriv(
      process.env.hash,
      process.env.key,
      process.env.iv,
    );
    const decrypted = decipher.update(text, 'hex', 'utf8');
    return decrypted + decipher.final('utf8');
  }
}
