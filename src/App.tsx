import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './consts/tabs';
import {HomeTab} from './Tabs/HomeTab/HomeTab';
import {ImagesTab} from './Tabs/ImagesTab/ImagesTab';
import {SheetsTab} from './Tabs/SheetsTab/SheetsTab';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useMMKVString} from 'react-native-mmkv';
import {STORAGE_IMAGES, STORAGE_SHEETS} from './consts/storage';

const BottomTab = createBottomTabNavigator();

export const App = () => {
  const [images] = useMMKVString(STORAGE_IMAGES);
  const [sheets] = useMMKVString(STORAGE_SHEETS);

  const imagesCount = JSON.parse(images || '[]').length;
  const sheetsCount = JSON.parse(sheets || '[]').length;
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
            headerTitle: `Images (${imagesCount})`,
            title: 'Images',
            tabBarBadge: imagesCount,
          }}
        />
        <BottomTab.Screen
          name={Tabs.Sheets}
          component={SheetsTab}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="table-view" color={color} size={size} />
            ),
            headerTitle: `Sheets (${sheetsCount})`,
            title: 'Sheets',
            tabBarBadge: sheetsCount,
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};
