import 'react-native';
import React from 'react';
import {HomeTab} from './HomeTab';
import DocumentPicker from 'react-native-document-picker';

import {act, cleanup, fireEvent, render} from '@testing-library/react-native';

jest.mock('react-native-document-picker', () => ({
  default: jest.fn(),
  pickSingle: jest.fn(),
}));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

afterEach(cleanup);

describe('HomeTab', () => {
  describe('render', () => {
    it('renders correctly', () => {
      render(<HomeTab />);
    });

    it('renders button', () => {
      const {getByText} = render(<HomeTab />);
      const msg = getByText('Pick image or sheet');
      expect(msg).toBeTruthy();
    });
  });

  describe('events', () => {
    it('when press button call Document picker', () => {
      const {getByText} = render(<HomeTab />);
      fireEvent.press(getByText('Pick image or sheet'));
      act(() => {
        expect(DocumentPicker.pickSingle).toBeCalledTimes(1);
      });
    });
  });
});
