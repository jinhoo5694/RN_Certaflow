import * as React from 'react';
import {Text, View} from 'react-native';

export default function Middle(props: any) {
  return (
    <View
      style={{
        height: 30,
        alignSelf: 'center',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ecaa00',
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
          color: '#ecaa00',
        }}>
        Slightly congested
      </Text>
    </View>
  );
}
