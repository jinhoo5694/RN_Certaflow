import * as React from 'react';
import {useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MypageHeader from './MypageHeader';
import Plan from './Plan';
import Saved from './Saved';

export default function Mypage({navigation}) {
  const [modal, setModal] = useState(false);
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <Modal
        visible={modal}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        transparent={true}>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.743,
              aspectRatio: 0.71,
              backgroundColor: '#fff',
              borderRadius: 20,
            }}>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{
                position: 'absolute',
                marginTop: 25,
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../public/icons/cross.png')}
                style={{
                  height: 15,
                  width: 15,
                  resizeMode: 'contain',
                  marginRight: 25,
                }}
              />
            </TouchableOpacity>
            <Image
              source={require('../../public/images/default_profile.png')}
              style={{
                width: Dimensions.get('window').width * 0.32,
                height: Dimensions.get('window').width * 0.32,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 33,
              }}
            />
            <Text
              style={{
                fontFamily: 'Inter',
                includeFontPadding: false,
                fontSize: 17,
                fontWeight: '600',
                color: '#000',
                alignSelf: 'center',
                marginTop: 26,
              }}>
              John Kim
            </Text>
            <View
              style={{
                flex: 1,
                width: Dimensions.get('window').width * 0.522,
                marginTop: 21,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#000',
                }}>
                Lorem ipsum dolor sit amet consectetur. Et nibh volutpat blandit
                in nibh lacus proin hendrerit et.
              </Text>
            </View>
            <View
              style={{
                marginTop: 24,
                alignItems: 'center',
                alignSelf: 'center',
                width: '100%',
                marginBottom: 34,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 15,
                  fontWeight: '300',
                  color: '#000',
                }}>
                Contribution Level
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../../public/icons/star.png')}
                  style={{
                    height: 31,
                    width: 31,
                    resizeMode: 'contain',
                  }}
                />
                <Image
                  source={require('../../public/icons/star.png')}
                  style={{
                    height: 31,
                    width: 31,
                    resizeMode: 'contain',
                  }}
                />
                <Image
                  source={require('../../public/icons/star.png')}
                  style={{
                    height: 31,
                    width: 31,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <MypageHeader navigation={navigation} />
      <View
        style={{
          width: Dimensions.get('window').width,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 33,
          marginTop: 20,
        }}>
        <TouchableOpacity onPress={() => setModal(true)}>
          <Image
            source={require('../../public/images/default_profile.png')}
            style={{
              height: 91,
              width: 91,
              resizeMode: 'contain',
              marginRight: 24,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 17,
              fontWeight: '600',
              color: '#000',
              marginBottom: 6,
            }}>
            John Kim
          </Text>
          <Text>Contribution Level</Text>
        </View>
      </View>
      <Plan />
      <Saved />
    </SafeAreaView>
  );
}
