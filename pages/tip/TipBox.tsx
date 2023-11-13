import * as React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';

export default function TipBox(props: any) {
  const windowWidth = Dimensions.get('window').width;
  const name = props.name;
  const content = props.content;
  const date = props.date;
  const likes = props.likes;
  const dislikes = props.dislikes;
  return (
    <View
      style={{
        width: windowWidth * 0.898,
        height: 94,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 4,
        flexDirection: 'row',
        paddingHorizontal: 13,
        paddingVertical: 10,
      }}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../public/images/default_profile.png')}
          style={{
            height: 48,
            width: 48,
            resizeMode: 'contain',
            marginBottom: 6,
          }}
        />
        <Text
          style={{
            fontFamily: 'Inter',
            includeFontPadding: false,
            fontSize: 13,
            fontWeight: '500',
            color: '#000',
          }}>
          {name}
        </Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          flex: 1,
          marginLeft: 17,
          marginVertical: 5,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 12,
              fontWeight: '500',
              color: '#000',
            }}>
            {content}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 11,
              fontWeight: '500',
              color: '#999',
            }}>
            {date}
          </Text>
          <View style={{flex: 1}} />
          <Image
            source={require('../../public/icons/thumbs_up.png')}
            style={{
              height: 13,
              width: 13,
              resizeMode: 'contain',
              marginRight: 4,
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 11,
              fontWeight: '500',
              color: '#000',
            }}>
            {likes.toString()}
          </Text>
          <Image
            source={require('../../public/icons/thumbs_down.png')}
            style={{
              height: 13,
              width: 13,
              resizeMode: 'contain',
              marginLeft: 5,
              marginRight: 4,
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 11,
              fontWeight: '500',
              color: '#000',
            }}>
            {dislikes.toString()}
          </Text>
        </View>
      </View>
    </View>
  );
}
