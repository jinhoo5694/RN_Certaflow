import * as React from 'react';
import {Alert, Dimensions, Image, TouchableOpacity, View} from 'react-native';

export default function MypageHeader(props: any) {
  const navigation = props.navigation;
  return (
    <View
      style={{
        height: 73,
        width: Dimensions.get('window').width,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../public/icons/back.png')}
          style={{
            height: 24,
            width: 24,
            marginLeft: 25,
          }}
        />
      </TouchableOpacity>
      <View style={{flex: 1}} />
      <TouchableOpacity onPress={() => Alert.alert('settings')}>
        <Image
          source={require('../../public/icons/setting.png')}
          style={{
            height: 30,
            width: 30,
            marginRight: 25,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
