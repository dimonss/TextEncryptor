import { Key } from 'lucide-react';

type SecretKeyFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SecretKeyField({ value, onChange }: SecretKeyFieldProps) {
  return (
    <div className="input-group">
      <label htmlFor="secretKey">Secret Key</label>
      <div className="key-input-wrapper">
        <input
          id="secretKey"
          type="password"
          className="key-input"
          placeholder="Enter a strong password..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Key size={18} style={{ position: 'absolute', right: '12px', color: 'var(--text-secondary)' }} />
      </div>
    </div>
  );
}
