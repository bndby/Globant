import {PropsWithChildren} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type LayerProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;
