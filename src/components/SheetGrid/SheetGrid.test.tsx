import 'react-native';
import React from 'react';
import {SheetGrid, SheetGridProps} from './SheetGrid';

import {render} from '@testing-library/react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const defaultProps: SheetGridProps = {
  sheets: [],
};

describe('SheetGrid', () => {
  describe('render', () => {
    it('renders correctly with default props', () => {
      render(<SheetGrid {...defaultProps} />);
    });

    it('renders correctly with sheets', () => {
      const propsWithSheets: SheetGridProps = {
        sheets: [
          {
            id: 1,
            data: 'Total\r\n10\r\n90',
            name: 'Sheet 1',
            total: 100,
          },
          {
            id: 2,
            data: 'Total\r\n90\r\n10',
            name: 'Sheet 2',
            total: 100,
          },
        ],
      };
      render(<SheetGrid {...propsWithSheets} />);
    });
  });
});
