import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function EventCard(props: any) {
  return (
    <View style={{width: '100%', marginBottom: 10}}>
      <TouchableOpacity style={{width: '100%'}}>
        <Image
          source={require('../../public/images/bopuri1.png')}
          style={{
            height: 177,
            aspectRatio: 1,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            marginTop: 5,
            fontFamily: 'Inter',
            includeFontPadding: false,
            fontSize: 15,
            fontWeight: '600',
            color: '#000',
          }}>
          Cute Bopuri
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}>
          <Image
            source={require('../../public/icons/calendar.png')}
            style={{
              height: 17,
              width: 17,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 14,
              fontWeight: '300',
              color: '#000',
            }}>
            09/14 - 09/21
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
          }}>
          <Image
            source={require('../../public/icons/location.png')}
            style={{
              height: 17,
              width: 17,
              resizeMode: 'contain',
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 14,
              fontWeight: '300',
              color: '#000',
            }}>
            Daejeon Convention Center
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexWrap: 'wrap',
            marginTop: 6,
          }}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 14,
              fontWeight: '400',
              color: '#aaa',
            }}>
            Lorem ipsum dolor sit amet consectetur. {'\n'}Scelerisque feugiat
            habitasse curabitur felis. Odi...
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
