import './index.css';
import { aesCryptoJsTextCodec } from './secureText/crypto/aesCryptoJsTextCodec';
import { useSecureTextApp } from './secureText/hooks/useSecureTextApp';
import { ModeTabs } from './secureText/ui/ModeTabs';
import { ProcessButton } from './secureText/ui/ProcessButton';
import { ResultPanel } from './secureText/ui/ResultPanel';
import { SecretKeyField } from './secureText/ui/SecretKeyField';
import { SecureTextHeader } from './secureText/ui/SecureTextHeader';
import { SourceTextSection } from './secureText/ui/SourceTextSection';

function App() {
  const app = useSecureTextApp({ codec: aesCryptoJsTextCodec });

  return (
    <div className="app-container">
      <SecureTextHeader />

      <ModeTabs mode={app.mode} onModeChange={app.setMode} />

      <SourceTextSection
        mode={app.mode}
        inputText={app.inputText}
        fileName={app.fileName}
        fileInputRef={app.fileInputRef}
        onInputTextChange={app.handleInputTextChange}
        onPickFileClick={app.openFilePicker}
        onFileSelected={app.handleFileSelected}
        onClearFile={app.clearLoadedFile}
      />

      <SecretKeyField value={app.secretKey} onChange={app.setSecretKey} />

      <ProcessButton mode={app.mode} onProcess={app.process} />

      <ResultPanel
        mode={app.mode}
        outputText={app.outputText}
        error={app.error}
        copied={app.copied}
        onDownload={app.downloadResult}
        onCopy={app.copyOutput}
      />
    </div>
  );
}

export default App;
