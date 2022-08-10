import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './consts/tabs';
import {HomeTab} from './Tabs/HomeTab/HomeTab';
import {ImagesTab} from './Tabs/ImagesTab/ImagesTab';
import {SheetsTab} from './Tabs/SheetsTab/SheetsTab';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomTab = createBottomTabNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name={Tabs.Home}
          component={HomeTab}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="add-circle" color={color} size={size} />
            ),
            title: 'Add',
          }}
        />
        <BottomTab.Screen
          name={Tabs.Images}
          component={ImagesTab}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="image" color={color} size={size} />
            ),
            title: 'Images',
          }}
        />
        <BottomTab.Screen
          name={Tabs.Sheets}
          component={SheetsTab}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="table-view" color={color} size={size} />
            ),
            title: 'Sheets',
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};
