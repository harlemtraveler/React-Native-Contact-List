import {
  TabNavigator,
  StackNavigator,
  // DrawerNavigator,
} from 'react-navigation';
import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import Favorites from './screens/Favorites';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Options from './screens/Options';
import User from './screens/User';
import colors from './utils/colors';

// const getDrawerItemIcon = icon => ({ tintColor }) => (
//   <MaterialIcons
//     name={icon}
//     size={22}
//     style={{color: tintColor }}
//   />
// );

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons
    name={icon}
    size={26}
    style={{ color: tintColor }}
  />
);

const ContactsScreens = StackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Contacts',
    navigationOptions: {
      // drawerIcon: getDrawerItemIcon('list'),
      tabBarIcon: getTabBarIcon('list'),
    },
  },
);

const FavoritesScreens = StackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Favorites',
    navigationOptions: {
      // drawerIcon: getDrawerItemIcon('star'),
      tabBarIcon: getTabBarIcon('star'),
    },
  },
);

const UserScreens = StackNavigator(
  {
    User: {
      screen: User,
    },
    Options: {
      screen: Options,
    },
  },
  {
    mode: 'modal',
    initialRouteName: 'User',
    navigationOptions: {
      // drawerIcon: getDrawerItemIcon('person'),
      tabBarIcon: getTabBarIcon('person'),
    },
  },
);

export default TabNavigator(
// export default DrawerNavigator(
  {
    Contacts: {
      screen: ContactsScreens,
    },
    Favorites: {
      screen: FavoritesScreens,
    },
    User: {
      screen: UserScreens,
    },
  },
  {
    initialRouteName: 'Contacts',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark,
      renderIndicator: () => null,
    },
  },
);
