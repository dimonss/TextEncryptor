import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Lock, Unlock, Copy, Check, Key } from 'lucide-react';
import './index.css';

type Mode = 'encrypt' | 'decrypt';

function App() {
  const [mode, setMode] = useState<Mode>('encrypt');
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Clear output when changing mode if it doesn't make sense anymore
    setOutputText('');
    setError('');
  }, [mode]);

  const handleProcess = () => {
    setError('');
    
    if (!inputText.trim()) {
      setError('Please enter some text.');
      return;
    }
    
    if (!secretKey.trim()) {
      setError('Please enter a secret key.');
      return;
    }

    try {
      if (mode === 'encrypt') {
        const encrypted = CryptoJS.AES.encrypt(inputText, secretKey).toString();
        setOutputText(encrypted);
      } else {
        const decrypted = CryptoJS.AES.decrypt(inputText, secretKey);
        const originalText = decrypted.toString(CryptoJS.enc.Utf8);
        
        if (!originalText) {
          setError('Decryption failed. Invalid key or corrupted text.');
          setOutputText('');
        } else {
          setOutputText(originalText);
        }
      }
    } catch (e) {
      setError('An error occurred during processing.');
      setOutputText('');
    }
  };

  const copyToClipboard = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderIcon = (mode: Mode) => {
    return mode === 'encrypt' ? <Lock size={20} /> : <Unlock size={20} />;
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>SecureText</h1>
        <p>AES-256 Encryption & Decryption</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${mode === 'encrypt' ? 'active' : ''}`}
          onClick={() => setMode('encrypt')}
        >
          <Lock size={18} /> Encrypt
        </button>
        <button 
          className={`tab ${mode === 'decrypt' ? 'active' : ''}`}
          onClick={() => setMode('decrypt')}
        >
          <Unlock size={18} /> Decrypt
        </button>
      </div>

      <div className="input-group">
        <label htmlFor="inputText">
          {mode === 'encrypt' ? 'Text to encrypt' : 'Text to decrypt'}
        </label>
        <textarea 
          id="inputText"
          className="text-input"
          placeholder={mode === 'encrypt' ? 'Enter your secret message here...' : 'Paste your encrypted ciphertext here...'}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="secretKey">
          Secret Key
        </label>
        <div className="key-input-wrapper">
          <input 
            id="secretKey"
            type="password"
            className="key-input"
            placeholder="Enter a strong password..."
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
          <Key size={18} style={{position: 'absolute', right: '12px', color: 'var(--text-secondary)'}} />
        </div>
      </div>

      <button className="action-btn" onClick={handleProcess}>
        {renderIcon(mode)}
        {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
      </button>

      <div className="output-group">
        <div className="output-header">
          <span className="output-label">Result</span>
          <button 
            className="copy-btn" 
            onClick={copyToClipboard}
            disabled={!outputText}
            style={{ opacity: !outputText ? 0.5 : 1, cursor: !outputText ? 'not-allowed' : 'pointer' }}
            title="Copy to clipboard"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        {error ? (
          <div className="output-text error">{error}</div>
        ) : outputText ? (
          <div className="output-text">{outputText}</div>
        ) : (
          <div className="output-text placeholder">
            Your {mode === 'encrypt' ? 'encrypted' : 'decrypted'} result will appear here...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
