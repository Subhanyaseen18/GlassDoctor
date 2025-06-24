import { wp, hp } from '../../../Utils';

import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    containerInput: {
      marginTop: hp(2),
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
    eyeIcon: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconColor: {
      color: theme.color.iconColor,
    },
    appIcon: {
      alignSelf: 'center',
      textAlign: 'center',
      height: hp(40),
      width: hp(40),
      //   color: theme.color.primaryIcon,
      //   marginTop: hp(7),
      //   marginBottom: hp(5),
    },
    buttonContainer: {
      marginTop: hp(6),
    },
    containerforgot: {
      alignItems: 'flex-end',

      marginRight: hp(1),
    },
    forgot: {
      fontSize: theme.size.reguler,
      color: theme.color.primaryIcon,
      textDecorationLine: 'underline',
      fontFamily: theme.family.medium,
    },
    icon: {
      size: hp(3),
      clr: theme.color.disabledButton,
    },
    appHeading: {
      alignSelf: 'center',
      textAlign: 'center',
      color: theme.color.primaryButton,
      fontFamily: theme.family.bold,
    },
  });
  return styles;
};
export default createStyles;
