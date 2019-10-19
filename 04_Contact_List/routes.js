import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from 'react-navigation-drawer';

import { MaterialIcons } from "@expo/vector-icons";

import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import Favorites from "./screens/Favorites";
import User from "./screens/User";
import Options from "./screens/Options";

import colors from "./utils/colors";

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);

// const getTabBarIcon = icon => ({ tintColor }) => (
//   <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
// );

// const ContactsStackNavigator = createStackNavigator(
//   {
//     Contacts: {
//       screen: Contacts
//       // navigationOptions: {
//       //   title: "Contacts"
//       // }
//     },
//     Profile: {
//       screen: Profile
//       // navigationOptions: ({
//       //   navigation: { state: { params } }
//       // }) => {
//       //   const { contact: { name } } = params;
//       //   return {
//       //     title: name.split(" ")[0],
//       //     headerTintColor: "white",
//       //     headerStyle: {
//       //       backgroundColor: colors.blue
//       //     }
//       //   };
//       // }
//     }
//   },
//   {
//     initialRouteName: "Contacts",
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon("list")
//     }
//   }
// );

// const FavoritesStackNavigator = createStackNavigator(
//   {
//     Favorites: {
//       screen: Favorites,
//       navigationOptions: {
//         title: "Favorites"
//       }
//     },
//     Profile: {
//       screen: Profile
//     }
//   },
//   {
//     initialRouteName: "Favorites",
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon("star")
//     }
//   }
// );

// const UserStackNavigator = createStackNavigator(
//   {
//     User: {
//       screen: User
//     },
//     Options: {
//       screen: Options
//     }
//   },
//   {
//     initialRouteName: "User",
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon("person")
//     }
//   }
// );
//
// const TabNavigator = createBottomTabNavigator(
//   {
//     Contacts: {
//       screen: ContactsStackNavigator
//     },
//     Favorites: {
//       screen: FavoritesStackNavigator
//     },
//     User: {
//       screen: UserStackNavigator
//     }
//   },
//   {
//     initialRouteName: "Contacts",
//     tabBarPosition: "bottom",
//     tabBarOptions: {
//       style: {
//         backgroundColor: colors.greyLight
//       },
//       showLabel: false,
//       showIcon: true,
//       activeTintColor: colors.blue,
//       inactiveTintColor: colors.greyDark,
//       renderIndicator: () => null
//     }
//   }
// );

// const AppNavigator = createAppContainer(TabNavigator);

const ContactsStackNavigator = createStackNavigator(
  {
    Contacts: {
      screen: Contacts
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Contacts",
    navigationOptions: {
      drawerIcon: getDrawerItemIcon("list")
    }
  }
);

const FavoritesStackNavigator = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: "Favorites"
      }
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Favorites",
    navigationOptions: {
      drawerIcon: getDrawerItemIcon("star")
    }
  }
);

const UserStackNavigator = createStackNavigator(
  {
    User: {
      screen: User
    },
    Options: {
      screen: Options
    }
  },
  {
    mode: 'modal',
    initialRouteName: "User",
    navigationOptions: {
      drawerIcon: getDrawerItemIcon("person")
    }
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Contacts: {
      screen: ContactsStackNavigator
    },
    Favorites: {
      screen: FavoritesStackNavigator
    },
    User: {
      screen: UserStackNavigator
    }
  },
  {
    initialRouteName: "Contacts"
  }
);

const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;
