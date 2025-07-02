import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import createStyles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconemail from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeAwareObject } from '../../../theme';
import RnText from '../../../Components/RnText';
import RnInput from '../../../Components/RnInput';
import ScrollContainer from '../../../Components/ScrollContainer';
import Header from '../../../Components/CustomHeader';
import RnButton from '../../../Components/RnButton';
import RnModal from '../../../Components/CustomModal';
import { setToken } from '../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
export default function Profile() {
  const styles = useThemeAwareObject(createStyles);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [oldShowPassword, setOldShowPassword] = useState(true);
  const [newShowPassword, setNewShowPassword] = useState(true);
  const [confirmShowPassword, setConfirmShowPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const formikRef = useRef();

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(setToken(null));
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
    console.log('values---profile', values);

    // const formData = new FormData();
    // imageUri !== null &&
    //   formData.append('profile_image', {
    //     uri: imageUri,
    //     name: 'image.png',
    //     type: 'image/png',
    //   });
    // formData.append('oldPassword', values.oldPassword);
    // formData.append('password', values.password);
    // formData.append('confirmPassword', values.confirmPassword);

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
    oldPassword: yup
      .string()
      .required('Please enter your current password')
      .min(8, 'Password must be at least 5 characters'),

    password: yup
      .string()
      .required('Please enter a new password')
      .min(8, 'New password must be at least 5 characters'),

    confirmPassword: yup
      .string()
      .required('Please confirm your new password')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
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
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.containerBack}
                >
                  <Icon
                    name="arrow-back-circle"
                    color={styles.icon.color}
                    size={styles.icon.sizeUser}
                  />
                </TouchableOpacity>
              }
              centerComponent={
                <RnText style={[styles.appHeading, styles.headingText]}>
                  Profile
                </RnText>
              }
              rightComponent={
                <TouchableOpacity
                  style={styles.containerBack}
                  onPress={() => setModalVisible(true)}
                >
                  <MaterialIcons
                    name="more-vert"
                    color={styles.icon.color}
                    size={styles.icon.hight}
                  />
                </TouchableOpacity>
              }
            />
          }
        >
          <View style={styles.containerInput}>
            <RnInput
              editable={false}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              inputStyle={styles.input}
              placeholder="Full Name"
              leftIcon={
                <Icon
                  color={styles.icon.color}
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
              placeholder="Email"
              leftIcon={
                <Iconemail
                  color={styles.icon.color}
                  name="email"
                  size={styles.icon.size}
                />
              }
            />
          </View>
          <View style={styles.containerInput}>
            <RnInput
              secureTextEntry={oldShowPassword}
              onChangeText={handleChange('oldPassword')}
              onBlur={handleBlur('oldPassword')}
              value={values.oldPassword}
              inputStyle={styles.input}
              error={errors.oldPassword && touched.v && errors.oldPassword}
              placeholder="Enter Old Password"
              leftIcon={
                <Iconemail
                  color={styles.icon.color}
                  name="lock"
                  size={styles.icon.size}
                />
              }
              rightIcon={
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setOldShowPassword(!oldShowPassword)}
                >
                  <Icon
                    color={styles.icon.color}
                    name={oldShowPassword ? 'eye-off' : 'eye'}
                    size={styles.icon.size}
                  />
                </TouchableOpacity>
              }
            />
          </View>
          <View style={styles.containerInput}>
            <RnInput
              secureTextEntry={newShowPassword}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              inputStyle={styles.input}
              error={errors.password && touched.password && errors.password}
              placeholder="Enter New Password"
              leftIcon={
                <Iconemail
                  color={styles.icon.color}
                  name="lock"
                  size={styles.icon.size}
                />
              }
              rightIcon={
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setNewShowPassword(!newShowPassword)}
                >
                  <Icon
                    color={styles.icon.color}
                    name={newShowPassword ? 'eye-off' : 'eye'}
                    size={styles.icon.size}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <View style={styles.containerInput}>
            <RnInput
              secureTextEntry={confirmShowPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              inputStyle={styles.input}
              error={
                errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword
              }
              placeholder="Repeat Your New Password"
              leftIcon={
                <Iconemail
                  color={styles.icon.color}
                  name="lock"
                  size={styles.icon.size}
                />
              }
              rightIcon={
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setConfirmShowPassword(!confirmShowPassword)}
                >
                  <Icon
                    color={styles.icon.color}
                    name={confirmShowPassword ? 'eye-off' : 'eye'}
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
          <RnModal
            modalContainer={styles.modalOverlay}
            show={modalVisible}
            backButton={() => setModalVisible(false)}
            backDrop={() => setModalVisible(false)}
            Visible={() => {}}
            hide={() => {}}
          >
            <View style={styles.modalContent}>
              <View>
                <RnText numberOfLines={1} style={styles.nameStyle}>
                  Hi Subhan Yaseen!
                </RnText>
              </View>

              <TouchableOpacity
                onPress={() => {
                  handleLogout();
                }}
              >
                <RnText style={styles.modalOption}>Logout</RnText>
              </TouchableOpacity>
            </View>
          </RnModal>
        </ScrollContainer>
      )}
    </Formik>
  );
}
