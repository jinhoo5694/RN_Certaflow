import * as React from 'react';
import {useContext} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import AppContext from '../../AppContext';
import axios from 'axios';

export default function ChatMessage(props: any) {
  const name = props.name;
  const time = props.time;
  const content = props.content;
  let likes = props.likes;
  const message = props.message;
  let user = props.user;
  const context = useContext(AppContext);
  const userId = context.id;
  const liked = props.liked;

  function likeComment() {
    message &&
      axios
        .post(
          'http://121.184.96.94:8070/api/v1/chat/' +
            message.messageInfo.chatMessageChatId +
            '/messages/' +
            message.messageInfo.messageId +
            '/like',
          {},
          {
            headers: {
              cert_user_id: userId,
            },
          },
        )
        .then(response => {
          likes += 1;
          user = true;
        })
        .catch(error => console.error(error));
  }

  return (
    <View style={{width: '100%', flexDirection: 'row', marginVertical: 8}}>
      <Image
        source={require('../../public/images/default_profile.png')}
        style={{
          height: 35,
          width: 35,
        }}
      />
      <View style={{flex: 1, marginLeft: 16}}>
        <Text
          style={{
            fontFamily: 'Inter',
            includeFontPadding: false,
            fontSize: 13,
            fontWeight: '500',
            color: '#000',
          }}>
          {name}
        </Text>
        <TouchableOpacity
          disabled={user}
          onPress={() =>
            Alert.alert('Like this comment?', '', [
              {
                text: 'Like',
                onPress: () => likeComment(),
                style: 'default',
              },
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'destructive',
              },
            ])
          }
          style={{
            backgroundColor: '#d9d9d9',
            borderRadius: 40,
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 4,
          }}>
          <Text>{content}</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 4,
          }}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 11,
              fontWeight: '500',
              color: '#999',
            }}>
            {time}
          </Text>
          <View style={{flex: 1}} />
          <Image
            source={
              liked
                ? require('../../public/icons/heart.png')
                : require('../../public/icons/like.png')
            }
            style={{
              height: 13,
              width: 13,
              resizeMode: 'contain',
              marginRight: 2,
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 11,
              fontWeight: '500',
              color: '#000',
            }}>
            {likes.toString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
