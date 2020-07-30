import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//import { storage } from "./firebase";
import * as firebase from "firebase";
import Colors from "../constants/Colors";
import "react-native-get-random-values";
import { v1 as uuidv1 } from "uuid";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const [imageLoading, setImageLoading] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImageLoading(true);
    setPickedImage(true);
    // try {
    var myRef = firebase.database().ref().push();
    var key = myRef.key;
    const nam = "image" + key;
    console.log("************************");
    console.log(key);
    if (!image.cancelled) {
      await uploadImage(image.uri, nam)
        // .then(() => {
        //   Alert.alert(JSON.stringify("Success"));
        // })
        .catch((error) => {
          Alert.alert(JSON.stringify(error));
        });
      var ref = firebase
        .storage()
        .ref()
        .child("images/" + nam);
      let url = await ref.getDownloadURL();
      setPickedImage(url);
      setImageLoading(false);
      props.onImageTaken(url);
    }
    // } catch (err) {
    //   Alert.alert (
    //   "Image couldn't be captured",
    //   "Please take the image again",
    //   [{text: "Okay"}]);
    // }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    return ref.put(blob);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <View style={styles.imagePreviewView}>
            {imageLoading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <Image style={styles.image} source={{ uri: pickedImage }} />
            )}
          </View>
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  imagePreviewView: {
    width: "100%",
    height: 200,
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
