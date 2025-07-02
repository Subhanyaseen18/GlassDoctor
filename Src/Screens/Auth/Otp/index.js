import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useThemeAwareObject } from '../../../Theme';
import createStyles from './style';
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import RnButton from '../../../Components/RnButton';
import RnText from '../../../Components/RnText';
import Container from '../../../Components/Container';
import Header from '../../../Components/CustomHeader';
import Snackbar from '../../../Components/Snackbar';

export default function Otp(props) {
  const otpData = props.route.params;
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();
  const CELL_COUNT = 4;
  const [value, setValue] = useState();
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [proops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleOtp = async () => {
    // try {
    //   if (value.length === 4) {
    //     const data = {
    //       url: otp,
    //       data: {
    //         email: otpData.email,
    //         reset_otp: value,
    //       },
    //     };
    //     const resp = await otpCode(data).unwrap();
    //     if (resp.code === 200) {
    //       navigation.navigate('NewPassword', {
    //         email: otpData.email,
    //       });
    //     } else {
    //       Snackbar(resp.message, true);
    //     }
    //   }
    // } catch (error) {
    //   Snackbar(error.error, true);
    // }
  };

  const handleResend = async () => {
    console.log('object');
    //     try {
    //       const data = {
    //         url: forgot,
    //         data: {email: otpData.email},
    //       };
    //       const resp = await reSend(data).unwrap();
    //       if (resp.code === 200) {
    //         setValue(resp.data.toFixed());
    //       } else {
    //         Snackbar(resp.message, true);
    //       }
    //     } catch (error) {
    //       Snackbar(error.error, true);
    //     }
  };

  return (
    <Container>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.containerBack}
          >
            <Icon
              name="arrow-back-circle"
              color={styles.icon.color}
              size={styles.icon.hight}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <RnText style={[styles.appHeading, styles.headingText]}>
            Get Your Code
          </RnText>
        }
      />

      <RnText style={[styles.appHeading, styles.subHeadingText]}>
        Please enter the 4 digit code that send to your email address.
      </RnText>
      <View style={styles.Containercode}>
        <CodeField
          ref={ref}
          {...proops}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <RnText
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </RnText>
          )}
        />
      </View>
      <View>
        <RnButton
          title="Verify"
          style={[styles.buttonContainer]}
          //   loading={otpResponse.isLoading}
          onPress={() => {
            handleOtp();
          }}
        />
      </View>
      <View style={styles.containerforgot}>
        <TouchableOpacity onPress={() => handleResend()}>
          <RnText style={styles.forgot}>resend?</RnText>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
