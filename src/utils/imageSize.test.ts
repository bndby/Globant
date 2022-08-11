import {Image} from 'react-native';
import {getImageSize} from './imageSize';

jest.mock('react-native', () => ({
  Image: {
    getSize: jest.fn((_path, callback, _errorCallback) => {
      callback({width: 100, height: 200});
    }),
  },
  Dimensions: {
    get: jest.fn(() => ({width: 300, height: 400})),
  },
}));

describe('imageSize', () => {
  describe('getImageSize', () => {
    it('should call Image.getSize', async () => {
      await getImageSize('<path>');
      expect(Image.getSize).toHaveBeenCalledWith(
        '<path>',
        expect.any(Function),
        expect.any(Function),
      );
    });
  });
});
