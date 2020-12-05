import 'react-native-gesture-handler';
import * as React from 'react';
import * as SQLite from 'expo-sqlite';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './src/mainscreen/HomeScreen';
import ListScreen from './src/mainscreen/ListScreen';
import MemoScreen from './src/mainscreen/MemoScreen';
import StaticsScreen from './src/mainscreen/StaticsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';



const db = SQLite.openDatabase('db.db');

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = (focused? 'ios-planet' : 'ios-planet');
          } else if (route.name === 'Memo') {
            iconName = 'md-bookmarks'
          } else if (route.name==='List') {
            iconName = 'ios-list'
          } else if (route.name==='Statics') {
            iconName = 'ios-stats'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Home" component={HomeScreen} initialParams={{database: db}} />
        <Tab.Screen name="Memo" component={MemoScreen} initialParams={{database: db}}/>
        <Tab.Screen name="List"  component={ListScreen} initialParams={{database: db}}/>
        <Tab.Screen name="Statics"  component={StaticsScreen} initialParams={{database: db}}/>        
      </Tab.Navigator>
    </NavigationContainer>
  );
}