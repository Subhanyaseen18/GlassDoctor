import { wp, hp } from '../../../Utils';

import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    chatContent: { padding: wp(2) },
    userMsg: {
      alignSelf: 'flex-end',
      marginVertical: wp(1.5),

      backgroundColor: theme.color.primaryButton,
      padding: wp(3),
      borderRadius: theme.borders.radius2,
      borderBottomRightRadius: theme.borders.radius1,
      elevation: 1,
    },

    userText: {
      color: theme.color.primaryText,
    },
    botMsg: {
      alignSelf: 'flex-start',
      marginVertical: wp(1.5),
      backgroundColor: theme.color.chatLightColor,
      padding: wp(3),
      borderRadius: theme.borders.radius2,
      borderBottomLeftRadius: 4,
      elevation: 1,
    },
    botText: {
      color: theme.color.secondaryText,
    },
    inputRowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: hp(2),
      paddingRight: wp(2),
      backgroundColor: theme.color.chatLightColor,
    },
    inputRow: {
      width: wp(86),
    },
    input: {
      backgroundColor: theme.color.primaryText,
      borderRadius: theme.borders.radius4,
      paddingHorizontal: wp(3),
    },
    abc: {
      borderColor: 'transparent',
    },
    sendButton: {
      paddingRight: wp(5),
    },
    sendCircle: {
      width: wp(12),
      height: wp(12),
      padding: wp(2),
      borderRadius: theme.borders.radius5,
      backgroundColor: theme.color.primaryButton,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      size: hp(2.5),
      hight: wp(7),
      color: theme.color.expenseBackground,
      clr: theme.color.primaryText,
      delete: theme.color.errorText,
    },
    appHeading: {
      alignSelf: 'center',
      textAlign: 'center',
      marginVertical: hp(1),
      fontSize: theme.size.xLarge + hp(0.2),
      color: theme.color.primaryButton,
      fontFamily: theme.family.bold,
    },
    rightComponentStyle: {
      flexDirection: 'row',
    },
    containerDelete: {
      marginRight: wp(3),
    },
    // model design
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.color.modalBackScreenColor,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      padding: wp(4),
      paddingTop: hp(7),
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
