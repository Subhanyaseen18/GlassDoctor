import { Formik } from 'formik';
import React, { useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import IconEmail from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconemail from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';

import RnInput from '../../../Components/RnInput';
import RnText from '../../../Components/RnText';
import ScrollContainer from '../../../Components/ScrollContainer';
import { useThemeAwareObject } from '../../../theme';
import createStyles from './style';
import Snackbar from '../../../Components/Snackbar';
import RnButton from '../../../Components/RnButton';
import { logoPath } from '../../../../assets/images';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const styles = useThemeAwareObject(createStyles);
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();

  const handleLogin = async values => {
    console.log('values', values);
    // navigation.navigate('Forgot');
    // const formData = new FormData();
    // formData.append('email', values.email);
    // formData.append('password', values.password);
    // let senddata = {
    //   url: login,
    //   data: formData,
    // };
    // try {
    //   const resp = await loginData(senddata).unwrap();
    //   if (resp.code === 200) {
    //     dispatch(setToken(resp.data.access_token));
    //     dispatch(setUser(resp?.data?.user));
    //   } else {
    //     Snackbar(resp.message, true);
    //   }
    // } catch (error) {
    //   Snackbar(error.error, true);
    // }
  };
  const LoginValidation = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1}\.[0-9]{1}\.[0-9]{1}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
        'Invalid email',
      )
      .required('Please enter email'),
    password: yup
      .string()
      .required('Please enter password')
      .min(8, 'Password must be at least 8 characters long'),
  });
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validateOnMount={true}
      onSubmit={values => handleLogin(values)}
      validationSchema={LoginValidation}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <ScrollContainer>
          <Image
            resizeMode="contain"
            source={logoPath}
            style={styles.appIcon}
          />
          <View style={styles.containerInput}>
            <RnInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              inputStyle={styles.input}
              placeholder="Email"
              leftIcon={
                <Iconemail
                  style={styles.iconColor}
                  name="email"
                  size={styles.icon.size}
                />
              }
            />
          </View>
          <View style={styles.containerInput}>
            <RnInput
              secureTextEntry={showPassword}
              inputStyle={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password && touched.password && errors.password}
              value={values.password}
              leftIcon={
                <IconEmail
                  style={styles.iconColor}
                  name="lock"
                  size={styles.icon.size}
                />
              }
              rightIcon={
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    style={styles.iconColor}
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={styles.icon.size}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={styles.containerforgot}>
            <RnText
              style={styles.forgot}
              onPress={() => navigation.navigate('Forgot')}
            >
              Forgot Password?
            </RnText>
          </View>
          <View>
            <RnButton
              title="Login"
              style={[styles.buttonContainer]}
              // loading={loginResponse.isLoading}
              onPress={() => {
                handleSubmit();
              }}
            />
          </View>
        </ScrollContainer>
      )}
    </Formik>
  );
}
