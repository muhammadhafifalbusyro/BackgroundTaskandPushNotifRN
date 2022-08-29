import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };
  useEffect(() => {
    createChannel();
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>Hello</Text>
      <Button
        title="Press Notif"
        onPress={() => {
          PushNotification.localNotification({
            channelId: 'test-channel',
            title: 'You Click Notif',
            message: 'HALLO NOTIF',
          });
        }}
      />
    </View>
  );
};
export default App;
