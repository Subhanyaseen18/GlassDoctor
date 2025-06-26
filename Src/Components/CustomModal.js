import React from 'react';
import ReactNativeModal from 'react-native-modal';

const RnModal = ({ show, backButton, backDrop, children, Visible, hide }) => {
  return (
    <ReactNativeModal
      onModalHide={hide}
      onShow={Visible}
      isVisible={show}
      onBackButtonPress={backButton}
      onBackdropPress={backDrop}
      hasBackdrop
    >
      {children}
    </ReactNativeModal>
  );
};

export default RnModal;
