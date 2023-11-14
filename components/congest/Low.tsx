import * as React from 'react';
import {Text, View} from 'react-native';

export default function Low(props: any) {
  return (
    <View
      style={{
        height: 27,
        alignSelf: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#00990f',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 5,
      }}>
      <Text
        style={{
          fontFamily: 'Inter',
          includeFontPadding: false,
          fontSize: 13,
          fontWeight: '500',
          color: '#00990f',
        }}>
        Not congested
      </Text>
    </View>
  );
}
