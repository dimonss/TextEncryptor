export const MAX_TEXT_FILE_SIZE_BYTES = 1024 * 1024; // 1 MB

/** Value for `<input type="file" accept="..." />` */
export const TEXT_FILE_INPUT_ACCEPT =
  '.txt,.text,.md,.csv,.json,.xml,.log,.yaml,.yml,.html,.htm,.js,.ts,.css,.env,text/*';

export const ALLOWED_TEXT_EXTENSIONS = [
  'txt',
  'text',
  'md',
  'csv',
  'json',
  'xml',
  'log',
  'yaml',
  'yml',
  'html',
  'htm',
  'js',
  'ts',
  'css',
  'env',
] as const;
