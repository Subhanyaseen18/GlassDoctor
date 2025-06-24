import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useThemeAwareObject } from '../../../theme';
import createStyles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconemail from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { forgot } from '../../../endpoints';
import { usePostApiMutation } from '../../../service';

import RnInput from '../../../Components/RnInput';
import RnButton from '../../../Components/RnButton';
import Container from '../../../Components/Container';
import Header from '../../../Components/CustomHeader';
import Snackbar from '../../../Components/Snackbar';
import RnText from '../../../Components/RnText';
export default function ForgotEmail() {
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation();

  const handleEmail = async values => {
    navigation.navigate('Otp');
    // const formdata = new FormData();
    // formdata.append('email', values.email);
    // const data = {
    //   url: forgot,
    //   data: formdata,
    // };
    // try {
    //   const resp = await verifyEmail(data).unwrap();
    //   if (resp.code === 200) {
    //     navigation.navigate('Otp', {
    //       email: values.email,
    //       otp: resp.data,
    //     });
    //   } else {
    //     Snackbar(resp.message, true);
    //   }
    // } catch (error) {
    //   Snackbar(error.error, true);
    // }
  };
  const forgotPassword = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1}\.[0-9]{1}\.[0-9]{1}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
        'Invalid email',
      )
      .required('Please enter email'),
  });
  return (
    <Formik
      initialValues={{ email: 'subhan@gmail.com' }}
      validateOnMount={true}
      onSubmit={values => handleEmail(values)}
      validationSchema={forgotPassword}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
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
                Email Here
              </RnText>
            }
          />
          <View>
            <RnText style={[styles.appHeading, styles.subHeadingText]}>
              Enter the email address associated with your account.
            </RnText>
          </View>

          <View style={styles.containerInput}>
            <RnInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              inputStyle={styles.input}
              placeholder="Enter email"
              error={errors.email && touched.email && errors.email}
              leftIcon={
                <Iconemail
                  color={styles.icon.color}
                  name="email"
                  size={styles.icon.size}
                />
              }
            />
          </View>
          <View>
            <RnButton
              title="Recover Password"
              style={[styles.buttonContainer]}
              // loading={verifyEmailResponse.isLoading}
              onPress={() => {
                handleSubmit();
              }}
            />
          </View>
        </Container>
      )}
    </Formik>
  );
}
