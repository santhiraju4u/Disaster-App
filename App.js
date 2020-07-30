import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import placesReducer from "./store/places-reducer";
import { init } from "./helpers/db";
import authReducer from "./store/reducers/auth";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import ShopNavigator from "./navigation/ShopNavigator";
import PlacesNavigator from "./navigation/PlacesNavigator";
import TestNavigator from "./navigation/TestNavigator";
// import { YellowBox } from "react-native";
// YellowBox.ignoreWarnings(["Remote debugger"]);
// console.ignoredYellowBox = ['Remote debugger'];
import { YellowBox } from "react-native";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
YellowBox.ignoreWarnings(["Remote debugger"]);
if (!firebase.apps.length) {
  firebase.initializeApp(ApiKeys.FirebaseConfig);
}
init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      {/* <TestNavigator /> */}
      <ShopNavigator />
    </Provider>
  );
}
