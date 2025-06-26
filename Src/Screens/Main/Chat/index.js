import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import CustomHeader from '../../../Components/CustomHeader';
import RnText from '../../../Components/RnText';
import { useThemeAwareObject } from '../../../theme';
import createStyles from './style';
import RnInput from '../../../Components/RnInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Modal, Pressable } from 'react-native';
import { color } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

export default function Chat() {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const [messages, setMessages] = useState([
    { id: '1', role: 'bot', text: 'Welcome! Ask me anything 😊' },
    { id: '2', role: 'user', text: 'How does this work?' },
  ]);
  const flatListRef = useRef();
  const styles = useThemeAwareObject(createStyles);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Optional: simulate bot response
    // setTimeout(() => {
    //   const botResponse = {
    //     id: (Date.now() + 1).toString(),
    //     role: "bot",
    //     text: "Got it! Let me help you with that.",
    //   };
    //   setMessages((prev) => [...prev, botResponse]);
    // }, 1000);
  };

  const renderItem = ({ item }) => (
    <View style={item.role === 'user' ? styles.userMsg : styles.botMsg}>
      <RnText style={item.role === 'user' ? styles.userText : styles.botText}>
        {item.text}
      </RnText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        containerStyle={styles.testing}
        centerComponent={
          <RnText style={[styles.appHeading, styles.headingText]}>Chat</RnText>
        }
        rightComponent={
          <View style={styles.rightComponentStyle}>
            <TouchableOpacity style={styles.containerDelete}>
              <Icon
                name="trash"
                color={styles.icon.delete}
                size={styles.icon.hight}
              />
            </TouchableOpacity>
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
          </View>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContent}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputRowContainer}>
          <View style={styles.inputRow}>
            <RnInput
              placeholder="Ask Anything..."
              inputStyle={styles.input}
              numberOfLines={3}
              multiline
              containerStyle={styles.abc}
              value={inputText}
              onChangeText={setInputText}
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <View style={styles.sendCircle}>
              <Icon
                name="paper-airplane"
                color={styles.icon.clr}
                size={styles.icon.size}
              />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View>
              <RnText numberOfLines={1} style={styles.nameStyle}>
                Hi Subhan Yaseen!
              </RnText>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
                setModalVisible(false); /* handle profile */
              }}
            >
              <RnText style={styles.modalTextAccount}>Account Settings</RnText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false); /* handle logout */
              }}
            >
              <RnText style={styles.modalOption}>Logout</RnText>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
