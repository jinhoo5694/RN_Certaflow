import * as React from 'react';
import {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Home({navigation}) {
  const [modal, setModal] = useState(true);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState(4);
  const [tutorial, setTutorial] = useState(true);
  const categoryList = ['Restaurant', 'Cafe', 'Shopping', 'Landmark'];
  const windowWidth = Dimensions.get('window').width;
  return (
    <SafeAreaView>
      <Image
        source={require('../../public/images/img_1.png')}
        style={{
          position: 'absolute',
        }}
      />
      <Modal
        visible={tutorial}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        transparent={true}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 283,
              width: windowWidth * 0.557,
              backgroundColor: '#fff',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                includeFontPadding: false,
                fontSize: 15,
                fontWeight: '600',
                color: '#000',
              }}>
              If you are new...
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                includeFontPadding: false,
                fontWeight: '300',
                fontSize: 12,
                color: '#000',
                marginTop: 18,
              }}>
              What color denotes
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                includeFontPadding: false,
                fontWeight: '300',
                fontSize: 12,
                color: '#000',
              }}>
              the congestion level?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 26,
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View
                style={{
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                  backgroundColor: '#c80000',
                  marginLeft: 37,
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 12,
                  fontWeight: '300',
                  color: '#000',
                }}>
                Very congested
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 26,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View
                style={{
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                  backgroundColor: '#ECAA00',
                  marginLeft: 37,
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 12,
                  fontWeight: '300',
                  color: '#000',
                }}>
                Slightly congested
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: 26,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <View
                style={{
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                  backgroundColor: '#00990F',
                  marginLeft: 37,
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 12,
                  fontWeight: '300',
                  color: '#000',
                }}>
                Not congested
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setTutorial(false)}
              style={{
                height: 32,
                width: '50%',
                backgroundColor: '#333',
                marginTop: 26,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#fff',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          height: 50,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 40,
            width: windowWidth * 0.734,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.29)',
            paddingHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../public/icons/find.png')}
            style={{
              height: 20,
              width: 20,
              marginRight: 20,
            }}
          />
          <TextInput
            style={{
              height: '100%',
              flex: 1,
              marginRight: 20,
            }}
            placeholder={'Search here'}
            value={input}
            onChangeText={setInput}
          />
        </View>
        <TouchableOpacity
          onPress={() => Alert.alert('mypage')}
          style={{
            marginLeft: 7,
          }}>
          <Image
            source={require('../../public/icons/mypage.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 26,
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            category == 0 ? setCategory(4) : setCategory(0);
          }}
          style={{
            height: '100%',
            paddingHorizontal: 8,
            paddingVertical: 5,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderColor: category == 0 ? '#000' : 'rgba(0, 0, 0, 0.29)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: category == 0 ? 2 : 1,
            flexDirection: 'row',
            marginRight: 5,
          }}>
          <Image
            source={require('../../public/icons/restaurant.png')}
            style={{height: 15, width: 15, marginRight: 4}}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 13,
              fontWeight: '400',
              color: '#000',
            }}>
            Restaurant
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            category == 1 ? setCategory(4) : setCategory(1);
          }}
          style={{
            height: '100%',
            paddingHorizontal: 8,
            paddingVertical: 5,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderColor: category == 1 ? '#000' : 'rgba(0, 0, 0, 0.29)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: category == 1 ? 2 : 1,
            flexDirection: 'row',
            marginRight: 5,
          }}>
          <Image
            source={require('../../public/icons/cafe.png')}
            style={{height: 15, width: 15, marginRight: 4}}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 13,
              fontWeight: '400',
              color: '#000',
            }}>
            Cafe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            category == 2 ? setCategory(4) : setCategory(2);
          }}
          style={{
            height: '100%',
            paddingHorizontal: 8,
            paddingVertical: 5,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderColor: category == 2 ? '#000' : 'rgba(0, 0, 0, 0.29)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: category == 2 ? 2 : 1,
            flexDirection: 'row',
            marginRight: 5,
          }}>
          <Image
            source={require('../../public/icons/shopping.png')}
            style={{height: 15, width: 15, marginRight: 4}}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 13,
              fontWeight: '400',
              color: '#000',
            }}>
            Shopping
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            category == 3 ? setCategory(4) : setCategory(3);
          }}
          style={{
            height: '100%',
            paddingHorizontal: 8,
            paddingVertical: 5,
            backgroundColor: '#fff',
            borderRadius: 20,
            borderColor: category == 3 ? '#000' : 'rgba(0, 0, 0, 0.29)',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: category == 3 ? 2 : 1,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../public/icons/landmark.png')}
            style={{height: 15, width: 15, marginRight: 4}}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 13,
              fontWeight: '400',
              color: '#000',
            }}>
            Landmark
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
