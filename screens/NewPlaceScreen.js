import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  Alert,
  Picker,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as placesActions from "../store/places-actions";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import { compose } from "redux";


const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

const savePlaceHandler = () => {
    if (!titleValue || !selectedImage || !selectedLocation || titleValue=="placeholder") {
      Alert.alert(
        "Missing fields",
        "Please select issue type, click image and pick location to continue"
      );
    } else {
      dispatch(
        placesActions.addPlace(titleValue, selectedImage, selectedLocation)
      );
    props.navigation.goBack();
    }
  };
  return (
    <ScrollView>
      <View style={styles.form}>
      <View>
          <Text style={styles.label}>Select the issue to report below</Text>
            <Picker style={styles.picker}
              selectedValue={titleValue}
              style={{ height: 50, width: '100%' }}
              onValueChange={titleChangeHandler}
              >
              <Picker.Item label="Select the issue" color="#dc143c" value="placeholder"/>
              {/* <Picker.Item label="------------------------" color='#00ffff'/> */}
              <Picker.Item label="Fire" value="fire" />
              <Picker.Item label="Water Leakage" value="waterleak" />
              <Picker.Item label="Bush Fire" value="bushfire" />
              <Picker.Item label="Toxic Leakage" value="toxicleak" />
              <Picker.Item label="Flood" value="flood" />
              {/* <Picker.Item label="Earthquake" value="earthquake" /> */}
              {/* <Picker.Item label="Tsunami" value="tsunami" /> */}
            </Picker>
        </View>
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
