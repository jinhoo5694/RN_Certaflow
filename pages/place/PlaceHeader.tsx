import * as React from 'react';
import {useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import High from '../../components/congest/High';
import Low from '../../components/congest/Low';
import Middle from '../../components/congest/Middle';

export default function PlaceHeader(props: any) {
  const navigation = props.navigation;
  const category = props.category;
  const title = props.title;
  const rating = props.rating;
  const congestion = props.congestion;
  const [bookmark, setBookmark] = useState(false);
  const windowWidth = Dimensions.get('window').width;

  function getCongestionLevel() {
    if (congestion == 0) {
      return <Low />;
    } else if (congestion == 1) {
      return <Middle />;
    } else if (congestion == 2) {
      return <High />;
    } else {
      return <View />;
    }
  }

  return (
    <View
      style={{
        width: windowWidth,
        backgroundColor: '#fff',
        flexDirection: 'row',
        // alignItems: 'center',
        paddingHorizontal: 26,
        paddingVertical: 24,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../public/icons/back.png')}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Inter',
            includeFontPadding: false,
            fontSize: 13,
            fontWeight: '400',
            color: '#bbb4b5',
            marginBottom: 5,
          }}>
          {category}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter',
            includeFontPadding: false,
            fontSize: 17,
            fontWeight: '600',
            color: '#000',
          }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 5,
            marginBottom: 10,
          }}>
          <Image
            source={require('../../public/icons/star_empty.png')}
            style={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 13,
              fontWeight: '300',
              color: '#000',
            }}>
            {rating.toString()}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 13,
              fontWeight: '300',
              color: '#000',
            }}>
            {' / 5.0'}
          </Text>
        </View>
        {getCongestionLevel()}
      </View>
      <TouchableOpacity onPress={() => setBookmark(!bookmark)}>
        <Image
          source={
            bookmark
              ? require('../../public/icons/bookMark.png')
              : require('../../public/icons/bookMarkNone.png')
          }
          style={{height: 30, width: 30, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  );
}
