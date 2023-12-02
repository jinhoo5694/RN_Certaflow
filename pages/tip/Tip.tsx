import * as React from 'react';
import {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Tip({navigation}) {
  const [input, setInput] = useState('');

  function sendTip() {
    Alert.alert('finished');
    navigation.goBack();
  }

  const options = {
    maxWidth: 300,
    maxHeight: 500,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          height: 73,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../public/icons/back.png')}
            style={{
              height: 20,
              width: 20,
              resizeMode: 'contain',
              marginLeft: 25,
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 20,
              fontWeight: '600',
              color: '#000',
              textAlign: 'center',
            }}>
            Add my tip
          </Text>
        </View>
        <View style={{width: 45}} />
      </View>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../public/images/tip.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width * 0.412,
            resizeMode: 'contain',
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingVertical: 26,
          }}>
          <TouchableOpacity
            onPress={() =>
              launchImageLibrary(options, response => {
                if (response.didCancel) {
                  Alert.alert('Cancel', 'User has canceled');
                } else if (response.error) {
                  Alert.alert('Error', 'Error occurred');
                } else {
                  console.log(response);
                }
              })
            }>
            <Image
              source={require('../../public/icons/addCircle.png')}
              style={{
                height: 60,
                width: 60,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 12,
              fontWeight: '300',
              color: '#000',
            }}>
            Add images
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 12,
              fontWeight: '300',
              color: '#000',
            }}>
            0/10
          </Text>
          <View
            style={{
              width: Dimensions.get('window').width * 0.898,
              height: 224,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#c6c6c6',
              marginTop: 32,
              padding: 25,
            }}>
            <TextInput
              style={{
                width: '100%',
                height: 150,
              }}
              value={input}
              onChangeText={setInput}
            />
            <Text style={{textAlign: 'right'}}>
              {input.length.toString() + '/2000'}
            </Text>
          </View>
          <TouchableOpacity
            disabled={input.length < 1}
            onPress={() => sendTip()}>
            <View
              style={{
                height: 49,
                width: 200,
                borderRadius: 50,
                backgroundColor: input.length ? '#000' : '#cacaca',
                marginTop: 26,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 17,
                  fontWeight: '600',
                  color: '#fff',
                }}>
                Register
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
