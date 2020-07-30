import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function LocationData() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
          
        }) ;
        
        //console.log(useState);
        //const lightSwitch = () => setLocation(location => !location);
        //const istrue= ()=> setLocation(location);
        setLocation(location);
        //this.useState({ isRunning: true });
        //setState(1);
        
      })();
    }
  },[errorMsg]);

  let text = 'Fetching Location..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
  
    text = JSON.stringify(location);
    console.log(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
   </View>
    //console.log(location),
    //console.log(text)
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
