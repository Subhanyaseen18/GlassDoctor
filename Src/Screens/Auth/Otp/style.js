import { wp, hp } from '../../../Utils';

import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    containerInput: {
      marginTop: hp(5),
      flexDirection: 'row',
      backgroundColor: theme.color.white,
      width: wp(92),
      alignItems: 'center',
    },

    input: {
      color: theme.color.inputbackcolor,
      fontFamily: theme.family.medium,
    },

    eror: {
      marginLeft: wp(2),
      color: theme.color.errorText,
      fontSize: theme.size.xSmall,
      fontFamily: theme.family.medium,
      width: wp(75),
    },

    icon: {
      size: hp(3.5),
      hight: wp(12),
      color: theme.color.iconColor,
    },
    headingText: {
      alignSelf: 'center',
      textAlign: 'center',
      color: theme.color.primaryButton,
      fontFamily: theme.family.bold,
      marginBottom: hp(2),
      fontSize: theme.size.xLarge + hp(0.2),
      width: wp(80),
    },

    subHeadingText: {
      fontSize: theme.size.medium,
      fontFamily: theme.family.medium,
      marginBottom: wp(10),
      width: wp(85),
    },
    buttonContainer: {
      marginTop: hp(8),
    },
    appHeading: {
      alignSelf: 'center',
      textAlign: 'center',
      color: theme.color.iconColor,
      fontFamily: theme.family.bold,
    },
    Containercode: {
      width: wp(80),
      alignSelf: 'center',
    },
    codeFieldRoot: {
      marginTop: wp(7),
    },
    cell: {
      color: theme.color.primaryIcon,
      width: wp(12),
      height: wp(13),
      lineHeight: wp(12),
      fontSize: theme.size.large,
      borderWidth: 2,
      borderColor: theme.color.iconColor,
      fontFamily: theme.family.bold,
      textAlign: 'center',
    },
    focusCell: {
      borderColor: theme.color.input,
    },
    containerforgot: {
      alignItems: 'flex-end',
      marginTop: hp(1),
      marginRight: hp(1),
    },
    forgot: {
      ontSize: theme.size.reguler,
      color: theme.color.primaryIcon,
      textDecorationLine: 'underline',
      fontFamily: theme.family.semiBold,
    },
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activity: {
      color: theme.color.blueBackground,
    },
    containerBack: {
      marginLeft: wp(-1),
    },
  });
  return styles;
};
export default createStyles;
