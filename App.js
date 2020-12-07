import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';
import { Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './src/mainscreen/HomeScreen';
import ListScreen from './src/mainscreen/ListScreen';
import MemoScreen from './src/mainscreen/MemoScreen';
import StaticsScreen from './src/mainscreen/StaticsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Tab = createBottomTabNavigator();


export default function App() {
  const [count, setCount] = useState(0);  

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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="List"  component={ListScreen}/>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Memo" component={MemoScreen}/>

        <Tab.Screen name="Statics"  component={StaticsScreen}/>        
      </Tab.Navigator>
    </NavigationContainer>
  );
}