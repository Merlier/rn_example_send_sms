/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Text,
  TextInput,
} from 'react-native';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import SmsAndroid from 'react-native-get-sms-android';

const App: () => React$Node = () => {
  const phoneNumber = 'XXXXXXXXXX';
  const [message, setMessage] = useState('Happy new year!');

  const getSMSPermission = async () => {
    try {
      const checkResult = await check(PERMISSIONS.ANDROID.SEND_SMS);
      switch (checkResult) {
        case RESULTS.DENIED:
          const requestResult = await request(PERMISSIONS.ANDROID.SEND_SMS);
          return Promise.resolve(requestResult);
        case RESULTS.GRANTED:
          return Promise.resolve(checkResult);
        default:
          return Promise.reject();
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const sendSMS = async () => {
    try {
      await getSMSPermission();
      SmsAndroid.autoSend(
        phoneNumber,
        message,
        (fail) => {
          console.log('Failed with this error: ' + fail);
        },
        (success) => {
          console.log('SMS sent successfully');
        },
      );
    } catch (err) {
      // console.log(err)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Send SMS using react-native on Android</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Message'}
          onChangeText={setMessage}
          value={message}
        />
        <Button onPress={sendSMS} title="Send SMS" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
});

export default App;
