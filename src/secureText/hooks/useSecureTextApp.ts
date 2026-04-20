import { useCallback, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { TextCodec } from '../crypto/TextCodec';
import { buildResultDownloadFileName } from '../files/buildResultDownloadFileName';
import { readFileAsUtf8 } from '../files/readFileAsUtf8';
import {
  describeTextFileUploadRejection,
  getTextFileUploadRejectReason,
} from '../files/textFileUploadRules';
import { triggerTextDownload } from '../files/triggerTextDownload';
import type { SecureTextMode } from '../types';
import { useCopyToClipboard } from './useCopyToClipboard';

type UseSecureTextAppOptions = {
  codec: TextCodec;
};

export function useSecureTextApp({ codec }: UseSecureTextAppOptions) {
  const [mode, setModeState] = useState<SecureTextMode>('encrypt');
  const [inputText, setInputText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { copied, copy } = useCopyToClipboard();

  const setMode = useCallback((next: SecureTextMode) => {
    let didChange = false;
    setModeState((prev) => {
      if (prev === next) return prev;
      didChange = true;
      return next;
    });

    if (didChange) {
      setOutputText('');
      setError('');
    }
  }, []);

  const resetFileInputValue = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const process = useCallback(() => {
    setError('');

    if (!inputText.trim()) {
      setError('Please enter some text or load a file.');
      return;
    }

    if (!secretKey.trim()) {
      setError('Please enter a secret key.');
      return;
    }

    if (mode === 'encrypt') {
      const result = codec.encrypt(inputText, secretKey);
      if (result.ok) {
        setOutputText(result.cipherText);
        return;
      }
      setError(result.error);
      setOutputText('');
      return;
    }

    const result = codec.decrypt(inputText, secretKey);
    if (result.ok) {
      setOutputText(result.plainText);
      return;
    }

    setError(result.error);
    setOutputText('');
  }, [codec, inputText, mode, secretKey]);

  const handleInputTextChange = useCallback((next: string) => {
    setInputText(next);
    setFileName((current) => (current ? '' : current));
  }, []);

  const handleFileSelected = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setError('');
      const file = event.target.files?.[0];
      if (!file) return;

      const rejectReason = getTextFileUploadRejectReason(file);
      if (rejectReason) {
        setError(describeTextFileUploadRejection(rejectReason, file));
        resetFileInputValue();
        return;
      }

      try {
        const content = await readFileAsUtf8(file);
        setInputText(content);
        setFileName(file.name);
        setOutputText('');
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Failed to read file.';
        setError(message);
      }

      resetFileInputValue();
    },
    [resetFileInputValue],
  );

  const clearLoadedFile = useCallback(() => {
    setFileName('');
    setInputText('');
    setOutputText('');
    setError('');
  }, []);

  const downloadResult = useCallback(() => {
    if (!outputText) return;
    const name = buildResultDownloadFileName(mode, fileName || undefined);
    triggerTextDownload(name, outputText);
  }, [fileName, mode, outputText]);

  const copyOutput = useCallback(() => {
    void copy(outputText);
  }, [copy, outputText]);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return {
    mode,
    setMode,
    inputText,
    handleInputTextChange,
    secretKey,
    setSecretKey,
    outputText,
    error,
    fileName,
    fileInputRef,
    copied,
    process,
    handleFileSelected,
    clearLoadedFile,
    downloadResult,
    copyOutput,
    openFilePicker,
  };
}
