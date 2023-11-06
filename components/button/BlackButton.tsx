import * as React from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';

export default function BlackButton(props: any) {
  const value = props.value;
  const onPress = props.onPress;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 40,
        width: Dimensions.get('window').width * 0.562,
        backgroundColor: '#000',
        borderRadius: 20,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Inter',
          includeFontPadding: false,
          fontSize: 13,
          fontWeight: '600',
          color: '#fff',
        }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}
