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
      size: hp(3),
      hight: wp(12),
      color: theme.color.iconColor,
    },
    headingText: {
      marginVertical: hp(1),
      fontSize: theme.size.xLarge + hp(0.2),
    },
    subHeadingText: {
      fontSize: theme.size.medium,
      fontFamily: theme.family.medium,
      marginBottom: wp(10),
      width: wp(85),
    },
    buttonContainer: {
      marginVertical: hp(8),
    },
    appHeading: {
      alignSelf: 'center',
      textAlign: 'center',
      color: theme.color.iconColor,
      fontFamily: theme.family.bold,
    },
    containerBack: {
      marginLeft: wp(-1),
    },
  });
  return styles;
};
export default createStyles;
