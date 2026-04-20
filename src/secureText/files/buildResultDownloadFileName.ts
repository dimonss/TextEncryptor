import type { SecureTextMode } from '../types';

function buildDownloadBaseName(fileName: string | undefined): string {
  if (!fileName) return 'secureText';

  const lower = fileName.toLowerCase();
  if (lower === '.env' || lower.startsWith('.env.')) {
    return fileName.replace(/^\./, '');
  }

  const stripped = fileName.replace(/\.[^.]+$/, '');
  return stripped || fileName;
}

export function buildResultDownloadFileName(
  mode: SecureTextMode,
  sourceFileName: string | undefined,
): string {
  const base = buildDownloadBaseName(sourceFileName);
  const suffix = mode === 'encrypt' ? '.encrypted.txt' : '.decrypted.txt';
  return `${base}${suffix}`;
}
