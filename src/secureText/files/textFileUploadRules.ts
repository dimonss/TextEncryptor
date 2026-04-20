import { MAX_TEXT_FILE_SIZE_BYTES } from '../constants';
import { isTextLikeFile } from './isTextLikeFile';

export type TextFileUploadRejectReason = 'too_large' | 'unsupported_type';

export function getTextFileUploadRejectReason(file: File): TextFileUploadRejectReason | null {
  if (file.size > MAX_TEXT_FILE_SIZE_BYTES) return 'too_large';
  if (!isTextLikeFile(file)) return 'unsupported_type';
  return null;
}

export function describeTextFileUploadRejection(
  reason: TextFileUploadRejectReason,
  file: File,
): string {
  if (reason === 'too_large') {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return `File is too large (${sizeMb} MB). Maximum allowed size is 1 MB.`;
  }

  return 'Unsupported file type. Please upload a text file.';
}
