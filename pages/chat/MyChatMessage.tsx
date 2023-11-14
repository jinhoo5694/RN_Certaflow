import * as React from 'react';
import {Image, Text, View} from 'react-native';

export default function MyChatMessage(props: any) {
  const time = props.time;
  const content = props.content;
  const likes = props.likes;
  return (
    <View style={{width: '100%', flexDirection: 'row', marginVertical: 8}}>
      <View style={{flex: 1, marginLeft: 16}}>
        <View
          style={{
            backgroundColor: '#fff',
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
          <View style={{flex: 1}} />
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
        </View>
      </View>
    </View>
  );
}
