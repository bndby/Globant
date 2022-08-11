import {getCSVDelimiter} from './csvDelimiter';

describe('csvDelimiter', () => {
  describe('getCSVDelimiter', () => {
    it('should return default delimiter', () => {
      expect(getCSVDelimiter('')).toEqual('\r\n');
    });
    it('should return rn delimiter', () => {
      expect(getCSVDelimiter('hello\r\ntext')).toEqual('\r\n');
      expect(getCSVDelimiter('hello\rmulti\nline\r\ntext')).toEqual('\r\n');
    });
    it('should return r delimiter', () => {
      expect(getCSVDelimiter('hello\rtext')).toEqual('\r');
    });
    it('should return n delimiter', () => {
      expect(getCSVDelimiter('hello\ntext')).toEqual('\n');
    });
  });
});
