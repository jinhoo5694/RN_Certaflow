import * as React from 'react';
import {useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatMessage from './ChatMessage';

export default function Chat({navigation, route}) {
  const place = route.params.place;
  const [confirm, setConfirm] = useState(false);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState('');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Modal
        visible={modal}
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        transparent={true}>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `rgba(0, 0, 0, 0.5)`,
          }}>
          <View
            style={{
              height: 159,
              width: 323,
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 18,
            }}>
            <TouchableOpacity onPress={() => setModal(false)}>
              <Image
                source={require('../../public/icons/cross.png')}
                style={{
                  height: 10,
                  width: 10,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 13,
                  fontWeight: '700',
                  color: '#000',
                }}>
                {
                  'Are you currently at the place?\nPlease confirm to join the live chat.'
                }
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <TouchableOpacity
                  style={{marginHorizontal: 14}}
                  onPress={() => {
                    setModal(false);
                  }}>
                  <Image
                    source={require('../../public/icons/no.png')}
                    style={{
                      height: 39.076,
                      width: 101.11,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginHorizontal: 14}}
                  onPress={() => {
                    setConfirm(true);
                    setModal(false);
                  }}>
                  <Image
                    source={require('../../public/icons/yes.png')}
                    style={{
                      height: 39.076,
                      width: 101.11,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../public/icons/back.png')}
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 15,
              fontWeight: '600',
              color: '#000',
            }}>
            {place.name + ' LIVE CHAT'}
          </Text>
        </View>
        <View style={{width: 24}} />
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../public/images/chattip.png')}
          style={{
            width: Dimensions.get('window').width * 0.888,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </View>
      <ScrollView
        style={{
          width: Dimensions.get('window').width * 0.888,
          paddingRight: 20,
          flex: 1,
        }}
        contentContainerStyle={{alignItems: 'center', flex: 1}}>
        <ChatMessage
          name={'Marcus'}
          time={'1 hour ago'}
          content={'sample content'}
          likes={10}
        />
      </ScrollView>
      <View
        style={{
          height: 56,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 15,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity>
          <Image
            source={require('../../public/icons/addPhoto.png')}
            style={{
              height: 26,
              width: 26,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, marginHorizontal: 11}}>
          {confirm ? (
            <TextInput
              style={{
                height: 29,
                width: '100%',
                backgroundColor: '#f6f6f6',
                borderRadius: 20,
                paddingHorizontal: 15,
              }}
              value={input}
              onChangeText={setInput}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setModal(true)}
              style={{
                height: 29,
                width: '100%',
                backgroundColor: '#f6f6f6',
                borderRadius: 20,
              }}
            />
          )}
        </View>
        {confirm ? (
          <TouchableOpacity>
            <Image
              source={require('../../public/icons/send.png')}
              style={{
                height: 26,
                width: 26,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require('../../public/icons/lock.png')}
            style={{
              height: 26,
              width: 26,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
