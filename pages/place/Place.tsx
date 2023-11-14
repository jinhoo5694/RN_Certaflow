import * as React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PlaceHeader from './PlaceHeader';
import ChatMessage from '../chat/ChatMessage';
import TipBox from '../tip/TipBox';

export default function Place({navigation, route}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <PlaceHeader
        navigation={navigation}
        category={'Brunch Cafe'}
        title={'Woodi Room'}
        rating={4.7}
        congestion={1}
      />
      <View
        style={{
          width: '100%',
          paddingLeft: 42,
          paddingVertical: 18,
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../public/icons/location.png')}
            style={{
              height: 17,
              width: 17,
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
            Daejeon Eoeun Rd. 19 F1
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../public/icons/time.png')}
            style={{
              height: 17,
              width: 17,
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
            11:00 - 21:00 (Close on Tuesdays)
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../public/icons/phone.png')}
            style={{
              height: 17,
              width: 17,
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
            010-1234-5678
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../public/icons/home.png')}
            style={{
              height: 17,
              width: 17,
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
            www.woodiroom.com
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          width: '100%',
          paddingHorizontal: 20,
        }}>
        <ScrollView
          style={{width: '100%', height: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#d9d9d9',
              paddingVertical: 20,
            }}>
            <View
              style={{flexDirection: 'row', width: '100%', marginBottom: 11}}>
              <Image
                source={require('../../public/icons/chat.png')}
                style={{
                  height: 20,
                  width: 20,
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#000',
                }}>
                LIVE CHAT
              </Text>
              <View style={{flex: 1}} />
              <TouchableOpacity>
                <Image
                  source={require('../../public/icons/refresh.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: '100%',
                borderRadius: 10,
                backgroundColor: '#f5f5f5',
                padding: 13,
              }}>
              <ChatMessage
                name={'Sandy'}
                time={'2mins ago'}
                content={'sample content'}
                likes={2}
              />
              <ChatMessage
                name={'Anika'}
                time={'30sec ago'}
                content={'Bla Bla Bla Bla'}
                likes={0}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                paddingVertical: 20,
              }}>
              <View
                style={{flexDirection: 'row', width: '100%', marginBottom: 11}}>
                <Image
                  source={require('../../public/icons/pin.png')}
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Inter',
                    includeFontPadding: false,
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#000',
                  }}>
                  Tips
                </Text>
                <View style={{flex: 1}} />
                <TouchableOpacity onPress={() => navigation.navigate('Tip')}>
                  <Text>Add my tip +</Text>
                </TouchableOpacity>
              </View>
              <TipBox
                name={'Sandy'}
                content={'Sample content'}
                date={'2023 Sept 27'}
                likes={1306}
                dislikes={11}
              />

              <TipBox
                name={'Marcus'}
                content={'Sample content'}
                date={'2022 Dec 31'}
                likes={50}
                dislikes={1}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
