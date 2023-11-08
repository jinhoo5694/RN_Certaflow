import * as React from 'react';
import {useState} from 'react';
import {Dimensions, Image, SafeAreaView, Text, View} from 'react-native';
import WhiteButton from '../../components/button/WhiteButton';
import WhiteInput from '../../components/text/WhiteInput';
import BlackButton from '../../components/button/BlackButton';

export default function Register(props: any) {
  const windowWidth = Dimensions.get('window').width;
  const setShowLogin = props.setShowLogin;
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
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
            value={email}
            onChange={setEmail}
            placeHolder={'certaflow@gmail.com'}
            secure={false}
            type={'email-address'}
          />
        </View>
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
            Password
          </Text>
          <WhiteInput
            value={pw}
            onChange={setPw}
            placeHolder={'10 characters minimum'}
            secure={false}
            type={'default'}
          />
        </View>
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
            Confirm Password
          </Text>
          <WhiteInput
            value={confirm}
            onChange={setConfirm}
            placeHolder={'confirm password'}
            secure={false}
            type={'default'}
          />
        </View>
        <BlackButton
          value={'Create Account'}
          onPress={() => setShowLogin(true)}
        />
        <View style={{height: 24}} />
        <WhiteButton value={'Login'} onPress={() => setShowLogin(true)} />
      </View>
    </SafeAreaView>
  );
}
