import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import createStyles from './style';

import Icon from 'react-native-vector-icons/Ionicons';
import IconDate from 'react-native-vector-icons/Fontisto';
import IconPhone from 'react-native-vector-icons/Feather';
import Iconemail from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconlock from 'react-native-vector-icons/FontAwesome6';
import IconEdit from 'react-native-vector-icons/FontAwesome5';
import { useThemeAwareObject } from '../../../theme';
import RnText from '../../../Components/RnText';
import RnInput from '../../../Components/RnInput';
import ScrollContainer from '../../../Components/ScrollContainer';
import Header from '../../../Components/CustomHeader';
import RnButton from '../../../Components/RnButton';

export default function Profile() {
  const styles = useThemeAwareObject(createStyles);

  const navigation = useNavigation();

  const [imagePicker, setImagePicker] = useState(false);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const formikRef = useRef();

  const handleLogout = async () => {
    // let data = {
    //   url: logout,
    // };
    // try {
    //   let resp = await logOut(data).unwrap();
    //   if (resp.status === 200) {
    //     dispatch(setToken(null));
    //   } else {
    //     Snackbar(resp.message, true);
    //   }
    // } catch (error) {
    //   Snackbar(error.error, true);
    // }
  };
  const handleUpdate = async values => {
    // const formData = new FormData();
    // imageUri !== null &&
    //   formData.append('profile_image', {
    //     uri: imageUri,
    //     name: 'image.png',
    //     type: 'image/png',
    //   });
    // formData.append('name', values.name);
    // formData.append('phone', values.number);
    // formData.append('country', values.country);
    // formData.append('city', values.city);
    // formData.append('address', values.address);
    // formData.append('about_me', values.about_me);
    // const formattedDate = date.toISOString().split('T')[0];
    // formData.append('date_of_birth', formattedDate);
    // formData.append('about_me', values.about_me);
    // let data = {
    //   url: completeProfile,
    //   data: formData,
    // };
    // try {
    //   let resp = await update(data).unwrap();
    //   if (resp.status === 200) {
    //     setEdit(false);
    //     dispatch(setUser(resp.data));
    //   } else {
    //     Snackbar(resp.message, true);
    //   }
    // } catch (error) {
    //   Snackbar(error.error, true);
    // }
  };

  const EditProfile = yup.object().shape({
    name: yup.string().required('Please enter name'),
    password: yup.string().required('Please enter city'),
    confirmPassword: yup.string().required('Please enter address'),
    oldPassword: yup.string().required('Please enter about yourself').min(5),
    country: yup.string().required('Please select your country'),
  });
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        name: '',
        email: '',
        oldPassword: '',
        password: '',
        confirmPassword: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        handleUpdate(values);
      }}
      validationSchema={EditProfile}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <ScrollContainer
          topBar={
            <Header
              leftComponent={
                edit && (
                  <TouchableOpacity
                    onPress={() => setEdit(false)}
                    style={styles.containerBack}
                  >
                    <Icon
                      name="arrow-back-circle"
                      color={styles.icon.color}
                      size={styles.icon.hight}
                    />
                  </TouchableOpacity>
                )
              }
              centerComponent={
                <RnText
                  style={[styles.appHeading, styles.headingText]}
                  family={styles.appHeading.fontFamily}
                >
                  Profile
                </RnText>
              }
              rightComponent={
                edit === false && (
                  <TouchableOpacity
                    onPress={() => setEdit(true)}
                    style={styles.containerBack}
                  >
                    <IconEdit
                      name="user-edit"
                      color={styles.icon.color}
                      size={styles.icon.sizeUser}
                    />
                  </TouchableOpacity>
                )
              }
            />
          }
        >
          <View style={styles.containerInput}>
            <RnInput
              editable={edit}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              inputStyle={styles.input}
              // error={errors.name && touched.name && errors.name}
              placeholder="Full Name"
              leftIcon={
                <Icon
                  style={styles.iconColor}
                  name="person"
                  size={styles.icon.size}
                />
              }
            />
          </View>

          <View style={styles.containerInput}>
            <RnInput
              editable={false}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              inputStyle={styles.input}
              // error={errors.email && touched.email && errors.email}
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
              // editable={edit}
              onChangeText={handleChange('oldPassword')}
              onBlur={handleBlur('oldPassword')}
              value={values.oldPassword}
              inputStyle={styles.input}
              // error={errors.aout_me && touched.about_me && errors.about_me}
              placeholder="Enter Old Password"
              leftIcon={
                <Iconemail
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
          <View style={styles.containerInput}>
            <RnInput
              // editable={edit}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              inputStyle={styles.input}
              // error={errors.address && touched.address && errors.address}
              placeholder="Enter New Password"
              leftIcon={
                <Iconemail
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

          <View style={styles.containerInput}>
            <RnInput
              // editable={edit}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              inputStyle={styles.input}
              // error={errors.about_me && touched.about_me && errors.about_me}
              placeholder="Repeat Your New Password"
              leftIcon={
                <Iconemail
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

          <RnButton
            title="Update"
            style={[styles.buttonContainer]}
            // loading={updateResponse.isLoading}
            onPress={() => handleSubmit()}
          />
        </ScrollContainer>
      )}
    </Formik>
  );
}
