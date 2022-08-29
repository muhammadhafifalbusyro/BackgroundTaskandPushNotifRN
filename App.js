import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import PushNotification from 'react-native-push-notification';

import BackgroundService from 'react-native-background-actions';

const App = () => {
  const sleep = time =>
    new Promise(resolve => setTimeout(() => resolve(), time));

  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).
  const veryIntensiveTask = async taskDataArguments => {
    // Example of an infinite loop task
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        PushNotification.localNotification({
          channelId: 'test-channel',
          title: 'You Click Notif',
          message: 'HALLO NOTIF',
        });
        await sleep(delay);
      }
    });
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };

  // BackgroundService.updateNotification({
  //   taskDesc: 'New ExampleTask description',
  // }); // Only Android, iOS will ignore this call
  // // iOS will also run everything here in the background until .stop() is called
  // BackgroundService.stop();

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  useEffect(() => {
    createChannel();
    BackgroundService.start(veryIntensiveTask, options);

    //aktifkan jika mau menghentikan background task
    BackgroundService.stop();
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
