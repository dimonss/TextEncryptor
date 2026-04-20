export type EncryptOutcome =
  | { ok: true; cipherText: string }
  | { ok: false; error: string };

export type DecryptOutcome =
  | { ok: true; plainText: string }
  | { ok: false; error: string };

/** Abstraction over text encryption so the UI depends on a contract, not a library (DIP). */
export interface TextCodec {
  encrypt(plainText: string, secretKey: string): EncryptOutcome;
  decrypt(cipherText: string, secretKey: string): DecryptOutcome;
}
