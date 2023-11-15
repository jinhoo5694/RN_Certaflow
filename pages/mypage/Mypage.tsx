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
                height: 50,
                width: Dimensions.get('window').width * 0.522,
                marginTop: 21,
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../public/icons/star_color.png')}
                style={{
                  height: 25,
                  width: 25,
                  marginHorizontal: 2.5,
                }}
              />
              <Image
                source={require('../../public/icons/star_color.png')}
                style={{
                  height: 25,
                  width: 25,
                  marginHorizontal: 2.5,
                }}
              />
              <Image
                source={require('../../public/icons/star_color.png')}
                style={{
                  height: 25,
                  width: 25,
                  marginHorizontal: 2.5,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 3,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#000',
                  marginRight: 13,
                }}>
                {235}
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#000',
                }}>
                points
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 3,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#000',
                  marginRight: 13,
                }}>
                {18}
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#000',
                }}>
                likes
              </Text>
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
