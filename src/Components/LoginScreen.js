import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  const onChangeEmail = (text) => {
    setEmail(text);
  };

  const onChangePass = (text) => {
    setPass(text);
  };

  const onSubmit = () => {
    console.log(email, pass, 'submitted');
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Login Page</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        value={email}
        onChangeText={onChangeEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        value={pass}
        onChangeText={onChangePass}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: Dimensions.get('window').height * 0.05,
    width: Dimensions.get('window').width * 0.95,
    borderWidth: 1,
    paddingRight: Dimensions.get('window').width * 0.05,
    marginRight: Dimensions.get('window').width * 0.02,
    paddingLeft: Dimensions.get('window').width * 0.05,
    marginLeft: Dimensions.get('window').width * 0.02,
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').width * 0.02,
    marginBottom: Dimensions.get('window').width * 0.1,
  },
});

export default LoginScreen;
