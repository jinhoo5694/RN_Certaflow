import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatMessage from './ChatMessage';
import MyChatMessage from './MyChatMessage';
import AppContext from '../../AppContext';
import axios from 'axios';

export default function Chat({navigation, route}) {
  const context = useContext(AppContext);
  const userId = context.id;
  const place = route.params.place;
  const [chatId, setChatId] = useState('');
  const position = route.params.position;
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState('');
  const [myChat, setMyChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState({});

  useEffect(() => {
    axios
      .get('http://121.184.96.94:8070/api/v1/location/' + place.locationId, {
        headers: {
          cert_user_id: userId,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        const id = response.data.item.locationChatId;
        setChatId(id);
        axios
          .put('http://121.184.96.94:8070/api/v1/chat/' + id + '/in', {}, {})
          .then(resp => console.log(resp.data))
          .catch(err => console.error(err));
        axios
          .get('http://121.184.96.94:8070/api/v1/chat/' + id + '/messages', {
            headers: {
              cert_user_id: userId,
            },
          })
          .then(response => {
            setMessages(response.data.item.chatMessageList);
          })
          .catch(err => console.error(err));
        axios
          .get('http://121.184.96.94:8070/api/v1/chat/' + id, {
            headers: {
              cert_user_id: userId,
            },
          })
          .then(response => setChatInfo(response.data.item.chatInfo))
          .catch(err => console.error(err));
      })
      .catch(error => console.error(error));
  }, [myChat]);

  useEffect(() => {
    let timer = setInterval(() => {
      chatId !== '' &&
        axios
          .get(
            'http://121.184.96.94:8070/api/v1/chat/' + chatId + '/messages',
            {
              headers: {
                cert_user_id: userId,
              },
            },
          )
          .then(response => setMessages(response.data.item.chatMessageList))
          .catch(error => console.error(error));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const chatMessages =
    messages.length > 0 &&
    messages.map(message =>
      message.messageInfo.chatMessageUserId == userId ? (
        <MyChatMessage
          key={message.messageInfo.messageId}
          name={message.messageInfo.chatMessageUserId}
          time={message.messageInfo.generatedAt.toString()}
          content={message.messageInfo.messageContent}
          likes={message.messageInfo.likesCount}
        />
      ) : (
        <ChatMessage
          key={message.messageInfo.messageId}
          message={message}
          name={message.messageInfo.chatMessageUserId}
          time={message.messageInfo.generatedAt}
          content={message.messageInfo.messageContent}
          likes={message.messageInfo.likesCount}
          user={
            message.isLikedByUser ||
            message.messageInfo.chatMessageUserId === userId
          }
          liked={message.isLikedByUser}
        />
      ),
    );

  function sendChat() {
    if (input.length == 0) {
      Alert.alert('Error', 'Please enter content');
      return;
    }
    const requestForm = {
      messageContent: input,
    };

    axios
      .post(
        'http://121.184.96.94:8070/api/v1/chat/' + chatId + '/messages',
        JSON.stringify(requestForm),
        {
          headers: {
            cert_user_id: userId,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        setMyChat(prevState => [...prevState, response.data.item]);
        setInput('');
      })
      .catch(error => console.error(error));
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function onConfirm() {
    const placeLatitude = place.locationLatitude;
    const placeLongitude = place.locationLongitude;
    const currLatitude = position.coords.latitude;
    const currLongitude = position.coords.longitude;
    const R = 6371;
    const dLat = deg2rad(placeLatitude - currLatitude);
    const dLon = deg2rad(placeLongitude - currLongitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(placeLatitude)) *
        Math.cos(deg2rad(currLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // 거리 (단위: 미터)

    return distance < 200;
  }

  function onJoin() {
    const closeEnough = onConfirm();
    if (closeEnough) {
      setModal(false);
      setConfirm(true);
    } else {
      Alert.alert('you are not in that place!');
      setModal(false);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Modal
        visible={modal}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        transparent={true}>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              height: 159,
              width: 323,
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 18,
            }}>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Image
                source={require('../../public/icons/cross.png')}
                style={{
                  height: 10,
                  width: 10,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 13,
                  fontWeight: '700',
                  color: '#000',
                }}>
                {
                  'Are you currently at the place?\nPlease confirm to join the live chat.'
                }
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <TouchableOpacity
                  style={{marginHorizontal: 14}}
                  onPress={() => {
                    setModal(false);
                  }}>
                  <Image
                    source={require('../../public/icons/no.png')}
                    style={{
                      height: 39.076,
                      width: 101.11,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginHorizontal: 14}}
                  onPress={() => {
                    onJoin();
                  }}>
                  <Image
                    source={require('../../public/icons/yes.png')}
                    style={{
                      height: 39.076,
                      width: 101.11,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        }}>
        <TouchableOpacity
          onPress={() => {
            axios
              .put(
                'http://121.184.96.94:8070/api/v1/chat/' + chatId + '/out',
                {},
                {},
              )
              .then(response => console.log(response.data))
              .catch(error => console.error(error));
            navigation.goBack();
          }}>
          <Image
            source={require('../../public/icons/back.png')}
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 15,
              fontWeight: '600',
              color: '#000',
            }}>
            {place.locationName +
              ' LIVE CHAT (' +
              (chatInfo && chatInfo.membersCount) +
              ' online)'}
          </Text>
        </View>
        <View style={{width: 24}} />
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../public/images/chattip.png')}
          style={{
            width: Dimensions.get('window').width * 0.888,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </View>
      <ScrollView
        style={{
          width: Dimensions.get('window').width * 0.888,
          paddingRight: 20,
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: 'center',
          marginBottom: 20,
        }}>
        {chatMessages}
      </ScrollView>
      <View
        style={{
          height: 56,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 15,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../public/icons/addPhoto.png')}
            style={{
              height: 26,
              width: 26,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, marginHorizontal: 11}}>
          {confirm ? (
            <TextInput
              style={{
                height: 29,
                width: '100%',
                backgroundColor: '#f6f6f6',
                borderRadius: 20,
                paddingHorizontal: 15,
              }}
              value={input}
              onChangeText={setInput}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setModal(true)}
              style={{
                height: 29,
                width: '100%',
                backgroundColor: '#f6f6f6',
                borderRadius: 20,
              }}
            />
          )}
        </View>
        {confirm ? (
          <TouchableOpacity onPress={() => sendChat()}>
            <Image
              source={require('../../public/icons/send.png')}
              style={{
                height: 26,
                width: 26,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require('../../public/icons/lock.png')}
            style={{
              height: 26,
              width: 26,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
