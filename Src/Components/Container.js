import { useThemeAwareObject } from '../theme';
import { wp } from '../Utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Container = ({ topBar, children, customStyle, props }) => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      mainContainer: {
        flexGrow: 1,
        backgroundColor: theme.color.primaryText,
      },
      innerContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(3),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View style={styles.mainContainer} {...props}>
      {topBar && topBar}
      <View style={[styles.innerContainer, customStyle]}>{children}</View>
    </View>
  );
};

export default Container;
