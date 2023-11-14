import * as React from 'react';
import {Text, View} from 'react-native';

export default function High(props: any) {
  return (
    <View
      style={{
        height: 27,
        alignSelf: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#c80000',
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
          color: '#c80000',
        }}>
        Very congested
      </Text>
    </View>
  );
}
