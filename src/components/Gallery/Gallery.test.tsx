import 'react-native';
import React from 'react';
import {Gallery, GalleryProps} from './Gallery';

import {render} from '@testing-library/react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const defaultProps: GalleryProps = {
  images: [],
};

describe('Gallery', () => {
  describe('render', () => {
    it('renders correctly with default props', () => {
      render(<Gallery {...defaultProps} />);
    });

    it('renders correctly with images', () => {
      const propsWithImages: GalleryProps = {
        images: [
          {
            id: 1,
            name: 'image 1',
            data: 'data:image/png;base64,image 1',
            width: 100,
            height: 100,
          },
          {
            id: 2,
            name: 'image 2',
            data: 'data:image/png;base64,image 2',
            width: 100,
            height: 100,
          },
        ],
      };
      render(<Gallery {...propsWithImages} />);
    });
  });
});
