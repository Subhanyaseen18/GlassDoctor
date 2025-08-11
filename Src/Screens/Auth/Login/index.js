import { Formik } from 'formik';
import React, { useState } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import IconEmail from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconemail from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import RnInput from '../../../Components/RnInput';
import RnText from '../../../Components/RnText';
import ScrollContainer from '../../../Components/ScrollContainer';
import createStyles from './style';
import Snackbar from '../../../Components/Snackbar';
import RnButton from '../../../Components/RnButton';
import { logoPath } from '../../../../assets/images';
import { usePostApiMutation } from '../../../redux/api/index';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../Components/CustomHeader';
import { setToken, setUser } from '../../../redux/slices/userSlice';
import { useThemeAwareObject } from '../../../theme';
import { user_login } from '../../../endPoints';

export default function Login() {
  const styles = useThemeAwareObject(createStyles);
  const [showPassword, setShowPassword] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginData, loginResponse] = usePostApiMutation();
  const handleLogin = async values => {
    // console.log('values', values);

    let senddata = {
      url: user_login,
      data: { email: values.email, password: values.password },
    };

    try {
      const resp = await loginData(senddata);

      if (resp?.data?.statusCode === 200) {
        console.log('login successfully');

        dispatch(setToken(resp?.data?.data?.token));
        dispatch(setUser(resp?.data?.data?.user));
        Snackbar(resp.data.message);
      } else {
        Snackbar(resp.error.data.message, true);
      }
    } catch (error) {
      console.log(error, 'error');

      Snackbar(error.error, true);
    }
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
      .min(6, 'Password must be at least 6 characters long'),
  });
  return (
    <Formik
      initialValues={{ email: 'subhany@gmail.com', password: 'password' }}
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
          <CustomHeader />
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
              loading={loginResponse.isLoading}
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
