/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

import LoginScreen from './Components/LoginScreen';

const App = () => {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  // Handle user state changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View>
        <LoginScreen />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView>
        {console.log(user)}
        <Text>Welcome {user.email}</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
