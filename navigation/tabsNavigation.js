import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ChatScreen from "../screens/ChatScreen";
import MapScreen from "../screens/MapScreen";
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import { HomeIcon, ChatIcon, MapIcon } from "../assets/images/svg-icons";

function HomeScreenRender() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
    </View>
  );
}

function ChatScreenRender() {
  return <ChatScreen />;
}

function MapScreenRender() {
  return <MapScreen />;
}

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  activeTintColor: "#1062FE",
  inactiveTintColor: "#000",
  style: {
    backgroundColor: "#F1F0EE",
    paddingTop: 5,
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        style={{ paddingTop: 50 }}
        initialRouteName="Home"
        tabBarOptions={tabBarOptions}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreenRender}
          options={{
            tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
          }}
        />
        <Tab.Screen
          name="Chat Now"
          component={ChatScreenRender}
          options={{
            tabBarIcon: ({ color }) => <ChatIcon fill={color} />,
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreenRender}
          options={{
            tabBarIcon: ({ color }) => <MapIcon fill={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
