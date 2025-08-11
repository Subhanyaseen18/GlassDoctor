import { wp, hp } from '../../../Utils';

import { StyleSheet } from 'react-native';

const createStyles = theme => {
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: theme.color.primaryText,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: { flex: 1, backgroundColor: theme.color.primaryText },
    chatContent: {
      padding: wp(3),
    },
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
      alignItems: 'center',
      paddingTop: hp(2),
      backgroundColor: theme.color.chatLightColor,
      borderTopRightRadius: theme.borders.radius4,
      borderTopLeftRadius: theme.borders.radius4,
    },

    input: {
      backgroundColor: theme.color.primaryText,
      borderRadius: theme.borders.radius4,
      paddingHorizontal: wp(3),
    },
    containerStyle: {
      borderColor: 'transparent',
      width: wp(79),
    },
    sendButton: {
      marginBottom: hp(1.5),
    },
    sendCircle: {
      width: wp(10),
      height: wp(10),
      borderRadius: theme.borders.radius5,
      backgroundColor: theme.color.primaryButton,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      size: hp(2.5),
      hight: wp(7),
      color: theme.color.iconColor,
      clr: theme.color.primaryText,
      delete: theme.color.errorText,
      activity: theme.color.secondaryText,
    },
    appHeading: {
      alignSelf: 'center',
      textAlign: 'center',
      color: theme.color.primaryButton,
      fontFamily: theme.family.bold,
      marginBottom: hp(2),
      fontSize: theme.size.xLarge + hp(0.2),
      width: wp(80),
    },
    rightComponentStyle: {
      flexDirection: 'row',
    },
    containerDelete: {
      marginRight: wp(3),
    },
    // model design
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
      borderBottomWidth: wp(0.5),
      borderColor: 'red',
    },
    // chat clear design
    deleteModalContainer: {
      backgroundColor: theme.color.primaryText,
      borderRadius: theme.borders.radius2,
      padding: wp(6),
      alignItems: 'center',
    },

    deleteModalTitle: {
      fontSize: theme.size.large,
      color: theme.color.secondaryText,
      fontFamily: theme.family.bold,
      marginBottom: hp(2),
    },

    deleteModalDescription: {
      fontSize: theme.size.small,
      color: theme.color.iconColor,
      textAlign: 'center',
      marginBottom: hp(2.5),
    },

    deleteModalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: wp(78),
    },

    noButton: {
      backgroundColor: theme.color.expenseBackground,
      borderRadius: theme.borders.radius4,
      alignItems: 'center',
      justifyContent: 'center',
      width: wp(36),
      height: hp(6),
    },

    yesButton: {
      backgroundColor: theme.color.primaryButton,
      borderRadius: theme.borders.radius4,
      alignItems: 'center',
      justifyContent: 'center',
      width: wp(36),
      height: hp(6),
    },

    noButtonText: {
      color: theme.color.secondaryText,
      fontSize: theme.size.small,
      fontFamily: theme.family.medium,
    },

    yesButtonText: {
      fontSize: theme.size.small,
      fontFamily: theme.family.medium,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 12,
    },

    emptyCard: {
      width: '100%',
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },

    emptyCardSmall: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
      marginHorizontal: 4,
    },

    emptyRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },

    emptyIcon: {
      width: 36,
      height: 36,
      resizeMode: 'contain',
      marginBottom: 8,
    },

    emptyIconSmall: {
      width: 28,
      height: 28,
      resizeMode: 'contain',
      marginBottom: 6,
    },

    emptyTextCenter: {
      fontSize: 14,
      color: '#333',
      textAlign: 'center',
    },
  });
  return styles;
};
export default createStyles;
