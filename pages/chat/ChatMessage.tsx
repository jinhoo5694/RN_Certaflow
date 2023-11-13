import * as React from 'react';
import {Image, Text, View} from 'react-native';

export default function ChatMessage(props: any) {
  const name = props.name;
  const time = props.time;
  const content = props.content;
  const likes = props.likes;
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
        <View
          style={{
            backgroundColor: '#d9d9d9',
            borderRadius: 40,
            width: '100%',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 4,
          }}>
          <Text>{content}</Text>
        </View>
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
            source={require('../../public/icons/like.png')}
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
