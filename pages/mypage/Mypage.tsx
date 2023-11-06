import * as React from 'react';
import {Dimensions, Image, SafeAreaView, Text, View} from 'react-native';
import MypageHeader from './MypageHeader';

export default function Mypage({navigation}) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <MypageHeader navigation={navigation} />
      <View
        style={{
          width: Dimensions.get('window').width,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 33,
          marginTop: 38,
        }}>
        <Image
          source={require('../../public/images/default_profile.png')}
          style={{
            height: 91,
            width: 91,
            resizeMode: 'contain',
            marginRight: 24,
          }}
        />
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 17,
              fontWeight: '600',
              color: '#000',
              marginBottom: 6,
            }}>
            John Kim
          </Text>
          <Text>Contribution Level</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
