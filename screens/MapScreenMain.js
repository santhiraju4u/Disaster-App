import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  TextInput,
} from "react-native";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  InfoWindow,
} from "react-google-maps";

import Colors from "../constants/Colors";
import MapView, { Marker } from "react-native-maps";
import HeaderButton from "../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Callout } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";

const MapScreenMain = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const initialLocation = props.navigation.getParam("initialLocation");
  const readonly = props.navigation.getParam("readonly");

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  //////////////////////////////////////////
  // const places = useSelector((state) => state.places.places);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(placesActions.loadPlaces());
  // }, [dispatch]);

  /////////////////////////////////////////
  const places = useSelector((state) => state.places.places);
  console.log("Your places are");
  console.log(places);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  /////////////////////////////////////////////////
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      // console.log("Found your location" + location.coords.latitude);
      //console.log(location.coords.longitude);
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      // Alert.alert(
      //   "Could not fetch location!",
      //   "Please try again later or pick a location on the map.",
      //   [{ text: "Okay" }]
      // );
    }
    setIsFetching(false);
  };
  ////////////////////////////////////////////////////////
  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
    // console.log(event.nativeEvent.coordinate.latitude);
    // console.log(event.nativeEvent.coordinate.longitude);
  };
  ////////////////////////////////////////////////

  componentDidMount = () => {
    this.getLocationHandler();
  };

  ////////////////////////////////////////////////
  //console.log(selectedLocation.lng);

  let regionone = {
    latitude: 51.523,
    longitude: 0.0803,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  let mapRegion = {
    region: [
      {
        id: 1,
        title: "Fire",
        regionone: {
          latitude: 51.523,
          longitude: 0.0803,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
      {
        id: 2,
        title: "Fire",
        regionone: {
          latitude: 51.5585169,
          longitude: 0.0108724,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
      {
        id: 3,
        title: "Fire",
        regionone: {
          latitude: 51.533,
          longitude: 0.0108512,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
      {
        id: 4,
        title: "Fire",
        regionone: {
          latitude: 51.543,
          longitude: 0.0108618,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
      {
        id: 5,
        title: "Fire",
        regionone: {
          latitude: 51.54135303611579,
          longitude: 0.03898490220308304,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
      {
        id: 6,
        title: "Water",
        regionone: {
          latitude: 51.53377586302478,
          longitude: 0.044029802083969116,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      },
      0,
    ],
  };
  let mapRegions = mapRegion.region
    .filter((item) => item.title == "Fire")
    .map(({ id, regionone }) => ({ id, regionone }));
  //console.log(mapRegion.region.filter(mapRegion.region, { title: "Fire" }));
  //console.log("Only" + mapRegions);
  // console.log(mapRegion);
  let focusRegion;
  if (pickedLocation) {
    focusRegion = {
      latitude: pickedLocation.lat,
      longitude: pickedLocation.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  } else {
    focusRegion = {
      latitude: 55.378051,
      longitude: 3.435973,
      latitudeDelta: 0.0012,
      longitudeDelta: 0.00005,
    };
  }

  let markerCoordinates;
  if (pickedLocation) {
    markerCoordinates = {
      latitude: pickedLocation.lat,
      longitude: pickedLocation.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  return (
    <MapView
      style={styles.map}
      placeholder="Search location"
      minLength={2}
      region={focusRegion}
      // onPress={componentDidMount()}
      onMapReady={getLocationHandler}
      showsUserLocation={true}
      //followsUserLocation={true}
      loadingEnabled={true}
      loadingIndicatorColor={"#606060"}
    >
      {places.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{ latitude: marker.lat, longitude: marker.lng }}
          title={marker.title}
          x
        >
          <MapView.Callout
            title={true}
            width={210}
            onPress={() => {
              props.navigation.navigate("PlaceDetail", {
                placeTitle: marker.title,
                placeId: marker.id,
              });
            }}
          ></MapView.Callout>
          {/* <MapView.Callout tooltip={false}>
            <Text>Fire</Text>
          </MapView.Callout> */}
          {/* <InfoWindow key={marker.id} visible={true}>
            <div>{marker.title}</div>
          </InfoWindow> */}
          {/* <Text style={{ color: "black", marginBottom: 50 }}>My Location</Text> */}
        </Marker>
      ))}

      {/* <MapView.Callout tooltip={false}>
        <Text>Fire</Text>
      </MapView.Callout> */}
      {/* <InfoWindow key={marker.id} visible={true}>
            <div>{marker.title}</div>
          </InfoWindow> */}
      {/* <Text style={{ color: "black", marginBottom: 50 }}>My Location</Text> */}

      {/* {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates} />
      )} */}
    </MapView>
  );
};

MapScreenMain.navigationOptions = (navData) => {
  return {
    headerTitle: "Incidents near you",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    // width: width,
    // height: height,
    //position: "absolute",
    //position: "relative",
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    position: "absolute",
    marginRight: "30%",
    marginTop: 20,
  },
  calloutSearch: {
    borderColor: "transparent",

    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0,
  },
});

export default MapScreenMain;
