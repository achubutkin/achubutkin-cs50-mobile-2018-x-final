import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import AllOrdersScreen from '../screens/AllOrdersScreen';
import OrderScreen from '../screens/OrderScreen';

import { Colors } from '../constants/SharedStyles';

const defaultNavigationOptions = {
  headerStyle: { backgroundColor: 'transparent' },
  headerTintColor: Colors.yellow,
  headerTransparent: true,
  headerTitleStyle: {
    color: Colors.yellow,
  },
};

const HomeStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    AllOrders: AllOrdersScreen,
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: Colors.yellow,
      inactiveTintColor: Colors.yellowOpacity,
      showIcon: false,
      labelStyle: {
        fontWeight: 'bold',
      },
      style: {
        borderTopWidth: 0,
        backgroundColor: 'transparent',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Home: HomeStack,
    Order: OrderScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: defaultNavigationOptions,
    transparentCard: true,
    transitionConfig: transitionProps => ({
      containerStyle: {
        backgroundColor: Colors.red,
      },
    }),
  }
);

export default createAppContainer(RootStack);
