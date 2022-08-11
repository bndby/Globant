import 'react-native';
import React from 'react';
import {SheetsTab} from './SheetsTab';

import {render} from '@testing-library/react-native';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('SheetsTab', () => {
  describe('render', () => {
    it('renders correctly', () => {
      render(<SheetsTab />);
    });

    it('renders button', () => {
      const {getByText} = render(<SheetsTab />);
      const msg = getByText('Clear all sheets');
      expect(msg).toBeTruthy();
    });
  });
});
