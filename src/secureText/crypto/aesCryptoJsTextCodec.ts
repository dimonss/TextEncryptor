import CryptoJS from 'crypto-js';
import type { DecryptOutcome, EncryptOutcome, TextCodec } from './TextCodec';

export class AesCryptoJsTextCodec implements TextCodec {
  encrypt(plainText: string, secretKey: string): EncryptOutcome {
    try {
      const cipherText = CryptoJS.AES.encrypt(plainText, secretKey).toString();
      return { ok: true, cipherText };
    } catch {
      return { ok: false, error: 'An error occurred during processing.' };
    }
  }

  decrypt(cipherText: string, secretKey: string): DecryptOutcome {
    try {
      const decrypted = CryptoJS.AES.decrypt(cipherText, secretKey);
      const plainText = decrypted.toString(CryptoJS.enc.Utf8);

      if (!plainText) {
        return { ok: false, error: 'Decryption failed. Invalid key or corrupted text.' };
      }

      return { ok: true, plainText };
    } catch {
      return { ok: false, error: 'An error occurred during processing.' };
    }
  }
}

export const aesCryptoJsTextCodec = new AesCryptoJsTextCodec();
