import React, {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IOS_BEHAVIOR} from '../../consts/keyboard';
import {IOS} from '../../consts/platforms';
import {styles} from './Layer.style';

type LayerProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export const Layer = ({children, style}: LayerProps) => {
  return (
    <View style={[styles.layout, style]}>
      <StatusBar />
      <KeyboardAvoidingView
        behavior={IOS_BEHAVIOR}
        enabled={Platform.OS === IOS}
        style={styles.keyboardAvoidingView}>
        <SafeAreaView style={styles.content}>{children}</SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};
