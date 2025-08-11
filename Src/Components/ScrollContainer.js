import { useThemeAwareObject } from '../theme';
import { wp } from '../Utils';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const ScrollContainer = ({ topBar, children, customStyle, props }) => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      mainContainer: {
        flex: 1,
        backgroundColor: 'white',
      },
      innerContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(4),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View style={styles.mainContainer} {...props}>
      {topBar && topBar}
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.innerContainer, customStyle]}
      >
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};
export default ScrollContainer;
