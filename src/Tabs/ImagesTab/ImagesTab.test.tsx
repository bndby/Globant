import 'react-native';
import React from 'react';
import {ImagesTab} from './ImagesTab';

import {render} from '@testing-library/react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('ImagesTab', () => {
  describe('render', () => {
    it('renders correctly', () => {
      render(<ImagesTab />);
    });

    it('renders button', () => {
      const {getByText} = render(<ImagesTab />);
      const msg = getByText('Clear all images');
      expect(msg).toBeTruthy();
    });
  });
});
