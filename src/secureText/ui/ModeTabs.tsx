import { Lock, Unlock } from 'lucide-react';
import type { SecureTextMode } from '../types';

type ModeTabsProps = {
  mode: SecureTextMode;
  onModeChange: (mode: SecureTextMode) => void;
};

export function ModeTabs({ mode, onModeChange }: ModeTabsProps) {
  return (
    <div className="tabs">
      <button
        type="button"
        className={`tab ${mode === 'encrypt' ? 'active' : ''}`}
        onClick={() => onModeChange('encrypt')}
      >
        <Lock size={18} /> Encrypt
      </button>
      <button
        type="button"
        className={`tab ${mode === 'decrypt' ? 'active' : ''}`}
        onClick={() => onModeChange('decrypt')}
      >
        <Unlock size={18} /> Decrypt
      </button>
    </div>
  );
}
