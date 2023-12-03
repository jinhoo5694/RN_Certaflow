/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Main from './pages/Main';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableLatestRenderer} from 'react-native-maps';
import AppContext from './AppContext';

enableLatestRenderer();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [auth, setAuth] = useState(false);
  const [id, setId] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const authValues = {
    auth: auth,
    setAuth: setAuth,
    id: id,
    setId: setId,
  };

  return (
    <AppContext.Provider value={authValues}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <Main />
          </SafeAreaView>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppContext.Provider>
  );
}

export default App;
