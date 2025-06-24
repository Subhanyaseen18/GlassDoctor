import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useThemeAwareObject} from '../theme';

const RnText = ({onPress, style, numberOfLines, children}) => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      textStyle: {
        color: theme.color.primaryText,
        fontSize: theme.size.small,
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <Text
      onPress={onPress}
      style={[styles.textStyle, style]}
      numberOfLines={numberOfLines ?? 0}
      allowFontScaling={false}>
      {children}
    </Text>
  );
};

export default RnText;
