import { useState, useEffect, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { Lock, Unlock, Copy, Check, Key, Upload, Download, FileText, X } from 'lucide-react';
import './index.css';

type Mode = 'encrypt' | 'decrypt';

const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1 MB
const ALLOWED_EXTENSIONS = ['txt', 'text', 'md', 'csv', 'json', 'xml', 'log', 'yaml', 'yml', 'html', 'htm', 'js', 'ts', 'css', 'env'];

function App() {
  const [mode, setMode] = useState<Mode>('encrypt');
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOutputText('');
    setError('');
  }, [mode]);

  const handleProcess = () => {
    setError('');

    if (!inputText.trim()) {
      setError('Please enter some text or load a file.');
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

  const isTextFile = (file: File): boolean => {
    if (file.type && file.type.startsWith('text/')) return true;
    if (file.type === 'application/json' || file.type === 'application/xml') return true;

    const name = file.name.toLowerCase();
    if (name === '.env' || name.startsWith('.env.') || name.endsWith('.env')) return true;

    const ext = name.split('.').pop() ?? '';
    return ALLOWED_EXTENSIONS.includes(ext);
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      setError(`File is too large (${sizeMb} MB). Maximum allowed size is 1 MB.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (!isTextFile(file)) {
      setError('Unsupported file type. Please upload a text file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result;
      if (typeof content === 'string') {
        setInputText(content);
        setFileName(file.name);
        setOutputText('');
      } else {
        setError('Failed to read file content.');
      }
    };
    reader.onerror = () => {
      setError('Failed to read file.');
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearFile = () => {
    setFileName('');
    setInputText('');
    setOutputText('');
    setError('');
  };

  const downloadResult = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const suffix = mode === 'encrypt' ? '.encrypted.txt' : '.decrypted.txt';
    let base = 'secureText';
    if (fileName) {
      const lower = fileName.toLowerCase();
      if (lower === '.env' || lower.startsWith('.env.')) {
        base = fileName.replace(/^\./, '');
      } else {
        const stripped = fileName.replace(/\.[^.]+$/, '');
        base = stripped || fileName;
      }
    }
    link.download = `${base}${suffix}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
        <div className="input-label-row">
          <label htmlFor="inputText">
            {mode === 'encrypt' ? 'Text to encrypt' : 'Text to decrypt'}
          </label>
          <button
            type="button"
            className="file-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Load a text file (max 1 MB)"
          >
            <Upload size={14} />
            Load file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.text,.md,.csv,.json,.xml,.log,.yaml,.yml,.html,.htm,.js,.ts,.css,.env,text/*"
            style={{ display: 'none' }}
            onChange={handleFileSelected}
          />
        </div>

        {fileName && (
          <div className="file-badge">
            <FileText size={14} />
            <span className="file-badge-name" title={fileName}>{fileName}</span>
            <button
              type="button"
              className="file-badge-clear"
              onClick={clearFile}
              title="Remove file"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <textarea
          id="inputText"
          className="text-input"
          placeholder={mode === 'encrypt' ? 'Enter your secret message here or load a .txt file (max 1 MB)...' : 'Paste your encrypted ciphertext here or load a file...'}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            if (fileName) setFileName('');
          }}
        />
        <span className="hint-text">Supported text files (incl. .env, .env.local) up to 1 MB.</span>
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
          <Key size={18} style={{ position: 'absolute', right: '12px', color: 'var(--text-secondary)' }} />
        </div>
      </div>

      <button className="action-btn" onClick={handleProcess}>
        {renderIcon(mode)}
        {mode === 'encrypt' ? 'Encrypt Text' : 'Decrypt Text'}
      </button>

      <div className="output-group">
        <div className="output-header">
          <span className="output-label">Result</span>
          <div className="output-actions">
            <button
              className="copy-btn"
              onClick={downloadResult}
              disabled={!outputText}
              style={{ opacity: !outputText ? 0.5 : 1, cursor: !outputText ? 'not-allowed' : 'pointer' }}
              title="Download result as .txt"
            >
              <Download size={16} />
              Download
            </button>
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
