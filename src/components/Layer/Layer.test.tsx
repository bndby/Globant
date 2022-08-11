import 'react-native';
import React from 'react';
import {Layer} from './Layer';
import {render, screen} from '@testing-library/react-native';
import {Text} from 'react-native';

describe('Layer', () => {
  describe('render', () => {
    it('renders correctly', () => {
      render(<Layer />);
    });

    it('renders children', () => {
      render(
        <Layer>
          <Text>Children</Text>
        </Layer>,
      );
      const children = screen.getByText('Children');
      expect(children).toBeTruthy();
    });
  });
});
