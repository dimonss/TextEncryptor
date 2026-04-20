import { useCallback, useRef, useState } from 'react';

export function useCopyToClipboard(resetAfterMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutIdRef = useRef<number | undefined>(undefined);

  const copy = useCallback(
    async (text: string) => {
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        if (timeoutIdRef.current !== undefined) {
          window.clearTimeout(timeoutIdRef.current);
        }

        timeoutIdRef.current = window.setTimeout(() => {
          setCopied(false);
          timeoutIdRef.current = undefined;
        }, resetAfterMs);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    },
    [resetAfterMs],
  );

  return { copied, copy };
}
