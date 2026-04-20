import { Check, Copy, Download } from 'lucide-react';
import type { SecureTextMode } from '../types';

type ResultPanelProps = {
  mode: SecureTextMode;
  outputText: string;
  error: string;
  copied: boolean;
  onDownload: () => void;
  onCopy: () => void;
};

export function ResultPanel({
  mode,
  outputText,
  error,
  copied,
  onDownload,
  onCopy,
}: ResultPanelProps) {
  const hasOutput = Boolean(outputText);
  const disabledStyle = { opacity: !hasOutput ? 0.5 : 1, cursor: !hasOutput ? 'not-allowed' : 'pointer' } as const;

  return (
    <div className="output-group">
      <div className="output-header">
        <span className="output-label">Result</span>
        <div className="output-actions">
          <button
            type="button"
            className="copy-btn"
            onClick={onDownload}
            disabled={!hasOutput}
            style={disabledStyle}
            title="Download result as .txt"
          >
            <Download size={16} />
            Download
          </button>
          <button
            type="button"
            className="copy-btn"
            onClick={onCopy}
            disabled={!hasOutput}
            style={disabledStyle}
            title="Copy to clipboard"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {error ? (
        <div className="output-text error">{error}</div>
      ) : hasOutput ? (
        <div className="output-text">{outputText}</div>
      ) : (
        <div className="output-text placeholder">
          Your {mode === 'encrypt' ? 'encrypted' : 'decrypted'} result will appear here...
        </div>
      )}
    </div>
  );
}
