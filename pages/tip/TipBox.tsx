import * as React from 'react';
import {useContext} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '../../AppContext';
import axios from 'axios';

export default function TipBox(props: any) {
  const context = useContext(AppContext);
  const placeId = props.placeId;
  const tipId = props.id;
  const userId = context.id;
  const windowWidth = Dimensions.get('window').width;
  const name = props.name;
  const liked = props.liked;
  const content = props.content;
  const date = props.date;
  const likes = props.likes;
  const dislikes = props.dislikes;

  function onLike() {
    axios
      .post(
        'http://121.184.96.94:8070/api/v1/location/' +
          placeId +
          '/tip/' +
          tipId +
          '/like',
        {},
        {
          headers: {
            cert_user_id: userId,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => Alert.alert('liked!'))
      .catch(error => console.error(error));
  }

  return (
    <TouchableOpacity
      disabled={liked}
      onPress={() => {
        if (!liked) {
          Alert.alert('Recommend', 'Like this tip?', [
            {
              text: 'Like',
              onPress: () => onLike(),
              style: 'default',
            },
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'destructive',
            },
          ]);
        }
      }}
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
    </TouchableOpacity>
  );
}
