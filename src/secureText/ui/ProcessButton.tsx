import { Lock, Unlock } from 'lucide-react';
import type { SecureTextMode } from '../types';

type ProcessButtonProps = {
  mode: SecureTextMode;
  onProcess: () => void;
};

export function ProcessButton({ mode, onProcess }: ProcessButtonProps) {
  return (
    <button type="button" className="action-btn" onClick={onProcess}>
      {mode === 'encrypt' ? <Lock size={20} /> : <Unlock size={20} />}
      {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
    </button>
  );
}
