import React, { useState } from 'react';
import { Text, View } from 'react-native';
import HomeImageItem from '../component/HomeImageItem.js'

function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HomeImageItem/>
      <Text>Home!</Text>
      <HomeImageItem/>
    </View>
  );
}

export default HomeScreen;
