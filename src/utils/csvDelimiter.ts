export const getCSVDelimiter = (content: string): string => {
  const delimiters = ['\r\n', '\n', '\r'];

  for (const delimiter of delimiters) {
    if (content.indexOf(delimiter) !== -1) {
      return delimiter;
    }
  }

  return '\r\n';
};
