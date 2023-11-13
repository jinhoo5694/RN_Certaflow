import * as React from 'react';
import {Image, Text, View} from 'react-native';

export default function ChatMessage(props: any) {
  const name = props.name;
  const time = props.time;
  const content = props.content;
  return (
    <View style={{width: '100%', flexDirection: 'row'}}>
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
            width: '90%',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginTop: 4,
          }}>
          <Text>{content}</Text>
        </View>
      </View>
    </View>
  );
}
