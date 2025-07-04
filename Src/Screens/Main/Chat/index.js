import React, { useState, useRef, useEffect } from 'react';
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
import { setToken } from '../../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { apiClient } from '../../../services';
import { clear_Chat, get_Chat, user_Logout } from '../../../endPoints';
import { usePostApiMutation } from '../../../redux/api';
import Snackbar from '../../../Components/Snackbar';

export default function Chat() {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingDots, setTypingDots] = useState('');
  const typingInterval = useRef(null);

  const [logOut] = usePostApiMutation();
  const [clearChat] = usePostApiMutation();
  const [getChat] = usePostApiMutation();

  const { token, user } = useSelector(state => state.user);
  const navigation = useNavigation();
  const flatListRef = useRef();
  const dispatch = useDispatch();
  const styles = useThemeAwareObject(createStyles);

  const handleLogout = async () => {
    const sendData = {
      url: user_Logout,
      data: { token },
    };
    try {
      const resp = await logOut(sendData);
      if (resp.data.statusCode === 200) {
        dispatch(setToken(null));
      } else {
        Snackbar(resp.data.message, true);
      }
    } catch (error) {
      Snackbar(error.error, true);
    }
    setModalVisible(false);
  };

  const clearChats = async () => {
    try {
      const sendData = {
        method: 'DELETE',
        url: `${clear_Chat}/${user.id}`,
      };
      const resp = await clearChat(sendData);
      Snackbar(resp.data.message, true);
      setMessages([]);
    } catch (error) {
      console.log(error);
    }
  };

  const getChatAll = async () => {
    try {
      const sendData = {
        url: `${get_Chat}/${user.id}`,
        method: 'POST',
        data: { page: 1, limit: 10 },
      };
      const resp = await getChat(sendData);
      if (resp.data.statusCode === 204) {
        const chatData = resp.data.data;
        const formattedMessages = [];
        chatData.forEach(item => {
          formattedMessages.push({
            id: `${item.id}-user`,
            role: 'user',
            text: item.message,
          });
          formattedMessages.push({
            id: `${item.id}-bot`,
            role: 'bot',
            text: item.response,
          });
        });
        setMessages(formattedMessages);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 300);
      } else {
        Snackbar(resp.data.message, true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatAll();
  }, []);

  const startTypingDots = () => {
    let dots = '';
    typingInterval.current = setInterval(() => {
      dots = dots.length < 3 ? dots + '.' : '';
      setTypingDots(dots);
    }, 500);
  };

  const stopTypingDots = () => {
    clearInterval(typingInterval.current);
    setTypingDots('');
  };

  const animateBotMessage = (messageId, fullText) => {
    const words = fullText.split(' ');
    let currentWordIndex = 0;
    let currentText = '';
    setIsTyping(true);
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        currentText +=
          (currentWordIndex > 0 ? ' ' : '') + words[currentWordIndex];
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, text: currentText } : msg,
          ),
        );
        currentWordIndex++;
        flatListRef.current?.scrollToEnd({ animated: true });
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 120);
  };

  const startStreaming = async () => {
    if (!inputText.trim()) return;
    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      text: inputText,
    };
    setMessages(prev => [...prev, userMessage]);
    flatListRef.current?.scrollToEnd({ animated: true });
    const userInput = inputText;
    setInputText('');

    try {
      setIsTyping(true);
      startTypingDots();

      const res = await apiClient.stream('/chat/conversation/basic', {
        messages: [{ role: 'user', content: userInput }],
      });
      const text = await res.text();

      stopTypingDots();
      const botMessageId = `${Date.now()}-bot`;
      setMessages(prev => [
        ...prev,
        { id: botMessageId, role: 'bot', text: '' },
      ]);
      animateBotMessage(botMessageId, text);
    } catch (error) {
      console.error('Streaming error:', error);
      stopTypingDots();
      setIsTyping(false);
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
            <TouchableOpacity
              style={styles.containerDelete}
              onPress={() => {
                setMessages([]);
                clearChats();
              }}
            >
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
          data={[
            ...messages,
            ...(isTyping && typingDots
              ? [{ id: 'typing', role: 'bot', text: typingDots }]
              : []),
          ]}
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
              containerStyle={styles.containerStyle}
              value={inputText}
              onChangeText={setInputText}
            />
          </View>

          <TouchableOpacity
            disabled={inputText.trim() === '' || isTyping}
            style={styles.sendButton}
            onPress={startStreaming}
          >
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
          <RnText numberOfLines={1} style={styles.nameStyle}>
            Hi Subhan Yaseen!
          </RnText>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('Profile');
            }}
          >
            <RnText style={styles.modalTextAccount}>Account Settings</RnText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <RnText style={styles.modalOption}>Logout</RnText>
          </TouchableOpacity>
        </View>
      </RnModal>
    </SafeAreaView>
  );
}
