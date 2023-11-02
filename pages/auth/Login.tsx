import * as React from 'react';
import {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Login(props: any) {
  const setAuth = props.setAuth;
  const windowWidth = Dimensions.get('window').width;
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  function login() {
    setAuth(true);
  }

  function register() {
    Alert.alert('register');
  }

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: '20%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: '700',
          }}>
          {'열심히 만든 어플'}
        </Text>
      </View>
      <Image
        source={require('../../public/images/bopuri1.png')}
        style={{
          alignSelf: 'center',
          width: windowWidth * 0.6,
          height: 200,
          resizeMode: 'contain',
        }}
      />
      <View
        style={{
          height: '25%',
          width: '100%',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <View
          style={{
            height: 50,
            width: windowWidth * 0.889,
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 25,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.29)',
          }}>
          <TextInput
            style={{marginHorizontal: 20, width: windowWidth * 0.889 - 40}}
            value={id}
            onChangeText={setId}
            placeholder={'Please enter ID'}
            keyboardType={'default'}
          />
        </View>
        <View
          style={{
            height: 50,
            width: windowWidth * 0.889,
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 25,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.29)',
          }}>
          <TextInput
            style={{marginHorizontal: 20, width: windowWidth * 0.889 - 40}}
            value={pw}
            onChangeText={setPw}
            placeholder={'Please enter PW'}
            keyboardType={'default'}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => login()}
          style={{
            height: 50,
            width: '40%',
            backgroundColor: '#fff',
            marginHorizontal: '5%',
            borderRadius: 25,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.29)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => register()}
          style={{
            height: 50,
            width: '40%',
            backgroundColor: '#fff',
            marginHorizontal: '5%',
            borderRadius: 25,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.29)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
