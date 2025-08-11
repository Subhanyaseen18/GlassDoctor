import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useThemeAwareObject } from '../../../theme';
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
import { usePostApiMutation } from '../../../redux/api';
import { forgor_password, verify_Otp } from '../../../endPoints';

export default function Otp(props) {
  const otpData = props.route.params;
  const [resendData] = usePostApiMutation();
  const [verifyOtpData, varifyOtpResponse] = usePostApiMutation();

  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();
  const CELL_COUNT = 6;
  const [value, setValue] = useState(otpData.otp);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [proops, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleOtp = async () => {
    try {
      if (value.length === 6) {
        const data = {
          url: verify_Otp,
          data: {
            email: otpData.email,
            otp: value,
          },
        };
        const resp = await verifyOtpData(data);

        if (resp?.data?.statusCode === 200) {
          navigation.navigate('Login');
          Snackbar(resp.data.message);
        } else {
          Snackbar(resp.data.message, true);
        }
      }
    } catch (error) {
      Snackbar(error.error.data.message, true);
    }
  };

  const handleResend = async () => {
    try {
      const data = {
        url: forgor_password,
        data: { email: otpData.email },
      };
      const resp = await resendData(data);
      if (resp?.data?.statusCode === 200) {
        setValue(resp?.data?.data?.otp);
        Snackbar(resp?.data?.message);
      } else {
        Snackbar(resp.error.data.message, true);
      }
    } catch (error) {
      Snackbar(error.error, true);
    }
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
          <RnText style={styles.headingText}>Get Your Code</RnText>
        }
      />

      <RnText style={[styles.appHeading, styles.subHeadingText]}>
        Please enter the 6 digit code that send to your email address.
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
          loading={varifyOtpResponse.isLoading}
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
