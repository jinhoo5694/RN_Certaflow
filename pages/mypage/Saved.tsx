import * as React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';

export default function Saved(props: any) {
  const windowWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        width: windowWidth * 0.822,
        marginTop: 36,
        alignSelf: 'center',
      }}>
      <View
        style={{
          height: 20,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Image
          source={require('../../public/icons/bookMark.png')}
          style={{
            height: 20,
            width: 20,
            resizeMode: 'contain',
            marginRight: 5,
          }}
        />
        <Text
          style={{
            fontFamily: 'Inter',
            includeFontPadding: false,
            fontSize: 15,
            fontWeight: '600',
            color: '#000',
            flex: 1,
          }}>
          Saved Places
        </Text>
        <TouchableOpacity
          style={{
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 13,
              fontWeight: '400',
              color: '#000',
            }}>
            more
          </Text>
          <Image
            source={require('../../public/icons/next.png')}
            style={{
              height: 16,
              width: 16,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
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
            Galleria
          </Text>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 12,
              fontWeight: '300',
              color: '#000',
            }}>
            Shopping Mall
          </Text>
        </TouchableOpacity>
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
            OST
          </Text>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 12,
              fontWeight: '300',
              color: '#000',
            }}>
            Jewerly Shop
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
