import { Header } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useThemeAwareObject } from '../theme';
function CustomHeader(props) {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      backgroundColor: theme.color.primaryText,

      statusBar: {
        backgroundColor: theme.color.primaryText,
      },
      sideContainerStyle: {
        justifyContent: 'center',
      },
      centerContainerStyle: {
        justifyContent: 'center',
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <Header
      statusBarProps={props.statusbar ?? styles.statusBar}
      barStyle={props.barStyle ?? 'dark-content'}
      placement={props.placement ?? 'center'}
      leftComponent={props.leftComponent}
      centerComponent={({ allowFontScaling: false }, props.centerComponent)}
      rightComponent={props.rightComponent}
      backgroundColor={props.backgroundColor ?? styles.backgroundColor}
      containerStyle={[styles.containerStyle, props.containerStyle]}
      centerContainerStyle={[
        styles.centerContainerStyle,
        props.centerContainerStyle,
      ]}
      leftContainerStyle={[styles.sideContainerStyle, props.leftContainerStyle]}
      rightContainerStyle={[
        styles.sideContainerStyle,
        props.rightContainerStyle,
      ]}
    />
  );
}

export default CustomHeader;
