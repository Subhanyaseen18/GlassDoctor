import React from 'react';
import { StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';

const RnModal = ({
  show,
  backButton,
  backDrop,
  children,
  Visible,
  hide,
  modalContainer,
}) => {
  return (
    <ReactNativeModal
      onModalHide={hide}
      onShow={Visible}
      isVisible={show}
      onBackButtonPress={backButton}
      onBackdropPress={backDrop}
      hasBackdrop
      style={[styles.modalContainer, modalContainer]}
    >
      {children}
    </ReactNativeModal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    // justifyContent: 'flex-start',
    // alignItems: 'flex-end',
  },
});
export default RnModal;
