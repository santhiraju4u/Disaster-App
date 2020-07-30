import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import CategoriesScreen from "../screens/user/CategoriesScreen";
import CategoryMealsScreen from "../screens/user/CategoryMealsScreen";
import MealDetailScreen from "../screens/user/MealDetailScreen";
import StartGameScreen from "../screens/user/StartGameScreen";
import AuthScreen from "../screens/user/AuthScreen";

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  Authentication: {
    screen: StartGameScreen,
  },
  Time: StartGameScreen,
  SignUp: {
    screen: AuthScreen,
  },
  MealDetail: MealDetailScreen,
});

export default createAppContainer(MealsNavigator);
