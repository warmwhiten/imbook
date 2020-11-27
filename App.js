import 'react-native-gesture-handler';
import * as React from 'react';
import * as SQLite from 'expo-sqlite';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/mainscreen/HomeScreen';
import ListScreen from './src/mainscreen/ListScreen';
import MemoScreen from './src/mainscreen/MemoScreen';

let db = SQLite.openDatabase("AppData.db")

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Memo" component={MemoScreen} />
        <Tab.Screen name="List" component={ListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}