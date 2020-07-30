import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import { Entypo } from "@expo/vector-icons";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { ReactReduxContext } from "react-redux";
import * as authActions from "../store/actions/auth";
import WelcomeScreen from "../screens/user/WelcomeScreen";
import ChatScreen from "../screens/ChatScreen";
import MapScreen from "../screens/MapScreen";
import HomeScreen from "../screens/HomeScreen";
//import { Colors } from "react-native/Libraries/NewAppScreen";
import NavigationContainer from "../navigation/tabsNavigation";
import { HomeIcon, ChatIcon, MapIcon } from "../assets/images/svg-icons";
import { Feather } from "@expo/vector-icons";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreenMain from "../screens/MapScreenMain";
import IncidentsScreen from "../screens/IncidentsScreen";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    Places: IncidentsScreen,
    PlaceDetail: PlaceDetailScreen,
    Map: MapScreen,
    // ProductsOverview: ProductsOverviewScreen,
    // ProductDetail: ProductDetailScreen,
    // Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Entypo
          name={Platform.OS === "android" ? "news" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-notifications" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const welcomeNavigator = createStackNavigator(
  {
    Orders: WelcomeScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-notifications" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-settings" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ChatNavigator = createStackNavigator(
  {
    Chat: ChatScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-settings" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-settings" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const TakeBack = createStackNavigator(
  {
    Map: MapScreen,
    ViewDetail: PlaceDetailScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-map" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const PlacesNavigator = createStackNavigator(
  {
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-map" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MapNavigator = createStackNavigator(
  {
    MapView: MapScreenMain,
    PlaceDetail: PlaceDetailScreen,
    Map: MapScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-map" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const tabScreenConfig = createBottomTabNavigator(
  {
    // Home: {
    //   screen: HomeNavigator,
    //   navigationOptions: {
    //     tabBarIcon: (tabInfo) => {
    //       return <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />;
    //     },
    //   },
    // },
    Map: {
      screen: MapNavigator,
      navigationOptions: {
        //tabBarLabel: "Favorites!",
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="md-map" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
    Report: {
      screen: PlacesNavigator,
      navigationOptions: {
        //tabBarLabel: "Favorites!",
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="md-add" size={25} color={tabInfo.tintColor} />;
        },
      },
    },
    Chat: {
      screen: ChatNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="md-chatboxes" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "ios-home" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

// const MealsFavTabNavigator =
//   Platform.OS === "android"
//     ? createMaterialBottomTabNavigator(tabScreenConfig, {
//         activeTintColor: "white",
//         shifting: true,
//         barStyle: {
//           backgroundColor: Colors.primaryColor,
//         },
//       })
//     : createBottomTabNavigator(tabScreenConfig, {
//         tabBarOptions: {
//           activeTintColor: Colors.accentColor,
//         },
//       });
const ShopNavigator = createDrawerNavigator(
  {
    // MealsFavs: {
    Home: tabScreenConfig,
    // navigationOptions: {
    //   drawerLabel: "Home",
    //   drawerIcon: (drawerConfig) => (
    //     <Ionicons
    //       name={Platform.OS === "android" ? "ios-home" : "ios-list"}
    //       size={23}
    //       color={drawerConfig.tintColor}
    //     />
    //   ),
    // },
    // },
    Incidents: ProductsNavigator,
    // Notification: OrdersNavigator,
    Notification: welcomeNavigator,
    Settings: HomeNavigator,

    // Settings: AdminNavigator,
    // Welcome: welcomeNavigator,
    // Home: tabScreenConfig,
    // test: MealsFavTabNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 30 }}>
          <SafeAreaView
            forceInset={{ top: "always", horizontal: "never" }}
          ></SafeAreaView>
          <DrawerItems {...props} />
          <Button
            title="Logout"
            color={Colors.primary}
            onPress={() => {
              dispatch(authActions.logout());
              props.navigation.navigate("Auth");
            }}
          />
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
