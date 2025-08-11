// Full clean implementation with "Data is empty" handling in Chat.js

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
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
import {
  clear_Chat,
  create_Chat,
  get_Chat,
  user_Logout,
} from '../../../endPoints';
import { usePostApiMutation } from '../../../redux/api';
import Snackbar from '../../../Components/Snackbar';

export default function Chat() {
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingDots, setTypingDots] = useState('');
  const [clearChatModalVisible, setClearChatModalVisible] = useState(false);

  const typingInterval = useRef(null);
  const [logOut] = usePostApiMutation();
  const [clearChat] = usePostApiMutation();
  const [getChat, getChatResponse] = usePostApiMutation();
  const [createChatData] = usePostApiMutation();

  const { token, user } = useSelector(state => state.user);
  const navigation = useNavigation();
  const flatListRef = useRef();
  const dispatch = useDispatch();
  const styles = useThemeAwareObject(createStyles);

  const handleLogout = async () => {
    const sendData = { url: user_Logout, data: { token } };
    try {
      const resp = await logOut(sendData);
      if (resp?.data?.statusCode === 200) {
        dispatch(setToken(null));
      } else {
        Snackbar(resp?.error?.error, true);
      }
    } catch (error) {
      Snackbar(error?.error, true);
    }
    setModalVisible(false);
  };

  const clearChats = async () => {
    try {
      const sendData = { method: 'DELETE', url: `${clear_Chat}/${user.id}` };
      const resp = await clearChat(sendData);
      Snackbar(resp?.data?.message, true);
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
      if (resp?.data?.statusCode === 204) {
        const chatData = resp.data.data;
        if (chatData.length === 0) {
          setMessages([]);
          return;
        }
        const reversedChatData = [...chatData].reverse();
        const formattedMessages = [];
        reversedChatData.forEach(item => {
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
      } else {
        Snackbar(resp?.error?.error, true);
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
      dots = dots.length < 3 ? dots + '.' : '.';
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

  const startStreaming = async presetText => {
    const textToSend = presetText || inputText.trim();
    if (!textToSend) return;

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      text: textToSend,
    };

    setMessages(prev => [...prev, userMessage]);
    flatListRef.current?.scrollToEnd({ animated: true });

    setInputText('');

    try {
      setIsTyping(true);
      startTypingDots();

      const sendData = {
        url: create_Chat,
        data: {
          id: user.id,
          query: textToSend,
        },
      };

      const resp = await createChatData(sendData).unwrap();
      console.log('✅ Chat API Response:', resp);

      stopTypingDots();

      const botMessageId = `${Date.now()}-bot`;

      setMessages(prev => [
        ...prev,
        { id: botMessageId, role: 'bot', text: '' },
      ]);

      const botText = resp?.text || resp?.data || 'No response received.';
      animateBotMessage(botMessageId, botText);
    } catch (error) {
      console.error('Streaming error:', error.error);
      Snackbar(error?.error || 'Something went wrong.', true);
      stopTypingDots();
      setIsTyping(false);
    }
  };
  const handlePredefinedQuestion = questionText => {
    setInputText(questionText);
    setTimeout(() => {
      startStreaming(questionText);
    }, 100); // slight delay to ensure inputText updates before streaming
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
              onPress={() => setClearChatModalVisible(true)}
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
        {getChatResponse.isLoading ? (
          <View style={styles.main}>
            <ActivityIndicator size="large" color={styles.icon.activity} />
          </View>
        ) : (
          <>
            {messages.length === 0 && !isTyping && (
              <View style={styles.emptyContainer}>
                <TouchableOpacity
                  style={styles.emptyCard}
                  onPress={() =>
                    handlePredefinedQuestion(
                      'What type of glass issue are you facing? (e.g., cracked window, broken door panel, etc.)',
                    )
                  }
                >
                  <RnText style={styles.emptyTextCenter}>
                    What type of glass issue are you facing? (e.g., cracked
                    window, broken door panel, etc.)
                  </RnText>
                </TouchableOpacity>

                <View style={styles.emptyRow}>
                  <TouchableOpacity
                    style={styles.emptyCardSmall}
                    onPress={() =>
                      handlePredefinedQuestion(
                        'Do you want to schedule a glass repair or get a price estimate first?',
                      )
                    }
                  >
                    <RnText style={styles.emptyTextCenter}>
                      Do you want to schedule a glass repair or get a price
                      estimate first?
                    </RnText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.emptyCardSmall}
                    onPress={() =>
                      handlePredefinedQuestion(
                        'Tell us about the damaged glass so we can help you effectively.',
                      )
                    }
                  >
                    <RnText style={styles.emptyTextCenter}>
                      Tell us about the damaged glass so we can help you
                      effectively.
                    </RnText>
                  </TouchableOpacity>
                </View>
              </View>
            )}

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
          </>
        )}
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
            style={styles.sendButton}
            onPress={() => startStreaming()}
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
      >
        <View style={styles.modalContent}>
          <RnText numberOfLines={1} style={styles.nameStyle}>
            Hi {user.name}!
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
      <RnModal
        show={clearChatModalVisible}
        backButton={() => setClearChatModalVisible(false)}
        backDrop={() => setClearChatModalVisible(false)}
      >
        <View style={styles.deleteModalContainer}>
          <RnText style={styles.deleteModalTitle}>Delete Confirmation</RnText>
          <RnText style={styles.deleteModalDescription}>
            Are you sure you want to delete all the chat and start over?
          </RnText>
          <View style={styles.deleteModalActions}>
            <TouchableOpacity
              style={styles.noButton}
              onPress={() => setClearChatModalVisible(false)}
            >
              <RnText style={styles.noButtonText}>No</RnText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yesButton}
              onPress={() => {
                setMessages([]);
                clearChats();
                setClearChatModalVisible(false);
              }}
            >
              <RnText style={styles.yesButtonText}>Yes</RnText>
            </TouchableOpacity>
          </View>
        </View>
      </RnModal>
    </SafeAreaView>
  );
}
