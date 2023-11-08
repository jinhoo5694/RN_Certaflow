import * as React from 'react';
import {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WhiteInput from '../../components/text/WhiteInput';
import BlackButton from '../../components/button/BlackButton';
import WhiteButton from '../../components/button/WhiteButton';
import Register from './Register';

export default function Login(props: any) {
  const setAuth = props.setAuth;
  const windowWidth = Dimensions.get('window').width;
  const [showLogin, setShowLogin] = useState(true);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  function login() {
    setAuth(true);
  }

  function register() {
    setShowLogin(false);
  }

  if (showLogin) {
    return (
      <SafeAreaView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../public/images/logo.png')}
            style={{
              height: 44,
              width: 177,
              resizeMode: 'contain',
              marginBottom: 82,
            }}
          />
          <View
          style={{
            width: windowWidth * 0.562,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <View style={{width: windowWidth * 0.562, marginBottom: 17}}>
          <Text
            style={{
              fontFamily: 'Inter',
              includeFontPadding: false,
              fontSize: 13,
              fontWeight: '600',
              color: '#000',
              textDecorationLine: 'underline',
              marginLeft: 10,
            }}>
            Email
          </Text>
          <WhiteInput
            value={id}
            onChange={setId}
            placeHolder={'certaflow@gmail.com'}
            secure={false}
            type={'email-address'}
          />
          </View>
          <View style={{width: windowWidth * 0.562, marginBottom: 3}}>
            <Text
              style={{
                fontFamily: 'Inter',
                includeFontPadding: false,
                fontSize: 13,
                fontWeight: '600',
                color: '#000',
                textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              Password
            </Text>
            <WhiteInput
              value={pw}
              onChange={setPw}
              placeHolder={'••••••••••'}
              secure={true}
              type={'default'}
            />
          </View>
          <View
            style={{
              width: windowWidth * 0.562,
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Inter',
                  includeFontPadding: false,
                  fontSize: 8,
                  fontWeight: '400',
                  color: '#a3a3a3',
                  textAlign: 'right',
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 23,
            }}
          />
          <BlackButton value={'Log in'} onPress={login} />
          <View
            style={{
              marginVertical: 12,
              width: windowWidth * 0.562,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                includeFontPadding: false,
                fontSize: 8,
                fontWeight: '400',
                color: '#a3a3a3',
              }}>
              {'─────────── OR ───────────'}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 7,
              width: windowWidth * 0.562,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter',
                includeFontPadding: false,
                fontSize: 10,
                fontWeight: '400',
                color: '#a3a3a3',
              }}>
              Don't have account?
            </Text>
          </View>
          <WhiteButton
            value={'Create Account'}
            onPress={() => setShowLogin(false)}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return <Register setShowLogin={setShowLogin} />;
  }
}
