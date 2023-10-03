import { createCipheriv, createDecipheriv } from 'crypto';

//Class that encrypt the name
export class AccessCryptography {
  encrypt(text: string) {
    const cipher = createCipheriv(
      process.env.hash,
      process.env.key,
      process.env.iv,
    );
    const encrypted = cipher.update(text);
    return Buffer.concat([encrypted, cipher.final()]).toString('base64');
    // console.log('iv' + process.env.iv.toString());
    // return {
    //   iv: process.env.toString(),
    //   encryptedData: encrypted.toString('base64', 0, 9),
    // };
  }

  decrypt(text: string) {
    const decipher = createDecipheriv(
      process.env.hash,
      process.env.key,
      process.env.iv,
    );
    // let decrypted = decipher.update(text, 'hex', 'utf8');
    // console.log(decrypted.length);
    // return (decrypted += decipher.final('utf8'));
    return Buffer.concat([
      decipher.update(text, 'base64'), // Expect `text` to be a base64 string
      decipher.final(),
    ]).toString();
  }
}
