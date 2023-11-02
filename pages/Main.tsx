import * as React from 'react';
import {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './home/Home';
import Chat from './chat/Chat';
import Tip from './tip/Tip';
import Mypage from './mypage/Mypage';
import Login from './auth/Login';

export default function Main(props: any) {
  const Stack = createNativeStackNavigator();
  const [auth, setAuth] = useState(false);

  if (auth) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'Chat'} component={Chat} />
        <Stack.Screen name={'Tip'} component={Tip} />
        <Stack.Screen name={'Mypage'} component={Mypage} />
      </Stack.Navigator>
    );
  } else {
    return <Login setAuth={setAuth} />;
  }
}
