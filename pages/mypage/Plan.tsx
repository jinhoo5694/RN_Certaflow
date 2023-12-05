import * as React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

export default function Plan(props: any) {
  const place = props.place;

  console.log(place);

  return (
    <TouchableOpacity
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
        {place && place.locationName}
      </Text>
      <Text
        style={{
          fontFamily: 'Inter',
          includeFontPadding: false,
          fontSize: 12,
          fontWeight: '300',
          color: '#000',
        }}>
        {''}
      </Text>
    </TouchableOpacity>
  );
}
