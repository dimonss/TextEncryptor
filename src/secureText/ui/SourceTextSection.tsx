import type { ChangeEvent, RefObject } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { TEXT_FILE_INPUT_ACCEPT } from '../constants';
import type { SecureTextMode } from '../types';

type SourceTextSectionProps = {
  mode: SecureTextMode;
  inputText: string;
  fileName: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onInputTextChange: (value: string) => void;
  onPickFileClick: () => void;
  onFileSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
};

export function SourceTextSection({
  mode,
  inputText,
  fileName,
  fileInputRef,
  onInputTextChange,
  onPickFileClick,
  onFileSelected,
  onClearFile,
}: SourceTextSectionProps) {
  return (
    <div className="input-group">
      <div className="input-label-row">
        <label htmlFor="inputText">{mode === 'encrypt' ? 'Text to encrypt' : 'Text to decrypt'}</label>
        <button
          type="button"
          className="file-btn"
          onClick={onPickFileClick}
          title="Load a text file (max 1 MB)"
        >
          <Upload size={14} />
          Load file
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept={TEXT_FILE_INPUT_ACCEPT}
          style={{ display: 'none' }}
          onChange={onFileSelected}
        />
      </div>

      {fileName ? (
        <div className="file-badge">
          <FileText size={14} />
          <span className="file-badge-name" title={fileName}>
            {fileName}
          </span>
          <button type="button" className="file-badge-clear" onClick={onClearFile} title="Remove file">
            <X size={14} />
          </button>
        </div>
      ) : null}

      <textarea
        id="inputText"
        className="text-input"
        placeholder={
          mode === 'encrypt'
            ? 'Enter your secret message here or load a .txt file (max 1 MB)...'
            : 'Paste your encrypted ciphertext here or load a file...'
        }
        value={inputText}
        onChange={(e) => onInputTextChange(e.target.value)}
      />
      <span className="hint-text">Supported text files (incl. .env, .env.local) up to 1 MB.</span>
    </div>
  );
}
