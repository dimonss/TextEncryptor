import { ALLOWED_TEXT_EXTENSIONS } from '../constants';

export function isTextLikeFile(file: File): boolean {
  if (file.type && file.type.startsWith('text/')) return true;
  if (file.type === 'application/json' || file.type === 'application/xml') return true;

  const name = file.name.toLowerCase();
  if (name === '.env' || name.startsWith('.env.') || name.endsWith('.env')) return true;

  const ext = name.split('.').pop() ?? '';
  return (ALLOWED_TEXT_EXTENSIONS as readonly string[]).includes(ext);
}
