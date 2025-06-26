import { wp, hp } from '../../../Utils';
import { StyleSheet } from 'react-native';
const createStyles = theme => {
  const styles = StyleSheet.create({
    containerInput: {
      marginTop: hp(3),
      flexDirection: 'row',
      backgroundColor: theme.color.white,
      width: wp(92),
      alignItems: 'center',
    },

    input: {
      fontSize: theme.size.medium,
      fontFamily: theme.family.medium,
    },
    eror: {
      marginLeft: wp(2),
      color: theme.color.errorText,
      fontSize: theme.size.xSmall,
      fontFamily: theme.family.medium,
      width: wp(75),
    },

    appHeading: {
      alignSelf: 'center',
      textAlign: 'center',
      color: theme.color.primaryButton,
      fontFamily: theme.family.bold,
    },
    headingText: {
      marginBottom: hp(2),
      fontSize: theme.size.xLarge + hp(0.2),
      width: wp(80),
    },

    subHeadingText: {
      fontSize: theme.size.medium,
      fontFamily: theme.family.medium,
      marginBottom: wp(7),
      width: wp(85),
    },
    buttonContainer: {
      marginVertical: hp(2),
    },
    logoutButtonContainer: {
      backgroundColor: theme.color.errorText,
      marginVertical: hp(2),
    },
    icon: {
      size: hp(3),
      hight: wp(12),
      sizeUser: wp(8),
      color: theme.color.primaryIcon,
    },
    headerText: {
      fontSize: theme.size.xLarge + hp(0.2),

      color: theme.color.primaryIcon,
    },
    topContainer: {
      flex: 1,
      marginTop: hp(5),
      alignItems: 'center',
    },
    appIcon: {
      textAlign: 'center',
      height: hp(25),
      color: theme.color.primaryIcon,
    },
    logoPerson: {
      height: hp(22),
      width: hp(22),
      borderRadius: theme.borders.radius5,
    },
    rnModal: {
      backgroundColor: theme.color.primaryText,
      borderRadius: theme.borders.radius2,
    },
    modalButtonConfirm: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingBottom: hp(2),
    },
    delButtonconfirm: {
      width: wp(42),
      backgroundColor: theme.color.errorText,
    },
    Button: {
      width: wp(42),
    },
    delModalHeading: {
      fontSize: theme.size.medium,
      color: theme.color.secondaryText,
      fontFamily: theme.family.bold,
      paddingVertical: hp(2),
      paddingHorizontal: hp(2),
    },
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.color.primaryBackground,
    },
  });
  return styles;
};
export default createStyles;
