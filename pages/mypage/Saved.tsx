import * as React from 'react';
import {Dimensions, Image, Text, TouchableOpacity} from 'react-native';

export default function Saved(props: any) {
  const windowWidth = Dimensions.get('window').width;
  const navigation = props.navigation;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Place')}
      style={{
        marginHorizontal: 7.5,
      }}>
      <Image
        source={require('../../public/icons/empty_place.png')}
        style={{height: 100, width: 100}}
      />
      <Text
        style={{
          fontFamily: 'Inter',
          includeFontPadding: false,
          fontSize: 14,
          fontWeight: '600',
          color: '#000',
          marginTop: 4,
        }}>
        Woody Room
      </Text>
      <Text
        style={{
          fontFamily: 'Inter',
          includeFontPadding: false,
          fontSize: 12,
          fontWeight: '300',
          color: '#000',
        }}>
        Brunch Cafe
      </Text>
    </TouchableOpacity>
  );
}
