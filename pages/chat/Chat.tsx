import * as React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

export default function Chat({navigation, route}) {
  const place = route.params.place;
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 25,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
            {place.name + ' LIVE CHAT'}
          </Text>
        </View>
        <View style={{width: 24}} />
      </View>
    </SafeAreaView>
  );
}
