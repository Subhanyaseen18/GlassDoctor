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

    buttonContainer: {
      marginVertical: hp(2),
    },

    icon: {
      size: hp(3),
      hight: wp(7),
      sizeUser: wp(12),
      color: theme.color.iconColor,
    },
    modalOverlay: {
      marginTop: hp(8),
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    },

    modalContent: {
      backgroundColor: theme.color.primaryText,
      borderRadius: theme.borders.radius1,
      width: wp(50),
      padding: wp(5),
    },
    nameStyle: {
      fontSize: theme.size.medium,
      color: theme.color.primaryButton,
      fontFamily: theme.family.samiBold,
      paddingBottom: hp(2),
    },
    modalOption: {
      color: theme.color.errorText,
      fontSize: theme.size.medium,
      fontFamily: theme.family.samiBold,
    },
    modalTextAccount: {
      paddingVertical: wp(4),
      fontSize: theme.size.medium,
      color: theme.color.secondaryText,
      fontFamily: theme.family.samiBold,
    },
    testing: {
      borderBottomWidth: wp(3),
      borderColor: 'red',
    },
  });
  return styles;
};
export default createStyles;
