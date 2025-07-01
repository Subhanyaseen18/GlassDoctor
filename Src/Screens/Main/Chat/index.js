import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import CustomHeader from '../../../Components/CustomHeader';
import RnText from '../../../Components/RnText';
import RnInput from '../../../Components/RnInput';
import { useThemeAwareObject } from '../../../theme';
import createStyles from './style';
import RnModal from '../../../Components/CustomModal';
import { setToken } from '../../../Redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { apiClient } from '../../../services/api';

export default function Chat() {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const flatListRef = useRef();
  const dispatch = useDispatch();

  const styles = useThemeAwareObject(createStyles);

  const [messages, setMessages] = useState([
    { id: '1', role: 'bot', text: 'Welcome! Ask me anything 😊' },
    { id: '2', role: 'user', text: 'How does this work?' },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };
  const handleLogout = () => {
    setModalVisible(false);

    dispatch(setToken(null));
  };

  const startStreaming = async () => {
    console.log('--------');

    const res = await apiClient.stream('/chat/conversation/premium', {
      messages: [
        {
          role: 'user',
          content: 'i am in dipression',
        },
        {
          role: 'user',
          content: 'i am in dipression',
        },
        {
          role: 'user',
          content: 'i am in dipression',
        },
        {
          role: 'user',
          content: 'i am in dipression',
        },
        {
          role: 'user',
          content: 'i am in dipression',
        },
      ],
    });

    // const reader = res.body.getReader();
    console.log('response ', JSON.stringify(res));

    // const decoder = new TextDecoder('utf-8');

    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const text = decoder.decode(value, { stream: true });
        console.log('Stream chunk:', text);
      }
    }
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
        centerComponent={<RnText style={styles.appHeading}>Chat</RnText>}
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

          <TouchableOpacity style={styles.sendButton} onPress={startStreaming}>
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
              setModalVisible(false);
              navigation.navigate('Profile');
            }}
          >
            <RnText style={styles.modalTextAccount}>Account Settings</RnText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleLogout();
            }}
          >
            <RnText style={styles.modalOption}>Logout</RnText>
          </TouchableOpacity>
        </View>
      </RnModal>
    </SafeAreaView>
  );
}
