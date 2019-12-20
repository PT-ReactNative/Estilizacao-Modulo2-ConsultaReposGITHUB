import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createBottomTabNavigator} from 'react-navigation-tabs';

import {colors} from '~/styles';

import Welcome from '~/pages/Welcome';
import Repositories from '~/pages/Repositories';
import Organizations from '~/pages/Organizations';

const Routes = (userLogged = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Welcome,
        User: createBottomTabNavigator(
          {
            Repositories,
            Organizations,
          },
          {
            tabBarOptions: {
              showIcon: true,
              showLabel: false,
              activeTintColor: colors.white,
              style: {
                backgroundColor: colors.secundary,
              },
            },
          },
        ),
      },
      {
        initialRouteName: userLogged ? 'User' : 'Welcome',
      },
    ),
  );

export default Routes;
