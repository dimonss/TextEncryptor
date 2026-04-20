export function readFileAsUtf8(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;
      if (typeof content === 'string') {
        resolve(content);
        return;
      }
      reject(new Error('Failed to read file content.'));
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file.'));
    };

    reader.readAsText(file);
  });
}
