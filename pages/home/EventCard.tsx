import * as React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

export default function EventCard(props: any) {
  const title = props.title;
  const date = props.date;
  const location = props.location;
  const description = props.description;
  const image = props.image;

  function getImage() {
    if (image == 'event1') {
      return require('../../public/images/event1.png');
    } else if (image == 'event2') {
      return require('../../public/images/event2.png');
    } else if (image == 'event3') {
      return require('../../public/images/event3.png');
    } else {
      return require('../../public/images/bopuri1.png');
    }
  }

  return (
    <View style={{width: '100%', marginBottom: 10}}>
      <TouchableOpacity style={{width: '100%'}}>
        <Image
          source={getImage()}
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
          {title}
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
            {date}
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
            {location}
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
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
