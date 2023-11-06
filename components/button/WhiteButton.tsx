import * as React from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';

export default function WhiteButton(props: any) {
  const value = props.value;
  const onPress = props.onPress;

  return (
    <TouchableOpacity
      style={{
        height: 40,
        width: Dimensions.get('window').width * 0.562,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#000',
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
      }}
      onPress={onPress}>
      <Text
        style={{
          fontFamily: 'Inter',
          includeFontPadding: false,
          fontSize: 13,
          fontWeight: '600',
          color: '#000',
        }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}
