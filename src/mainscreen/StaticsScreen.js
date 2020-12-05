import React, { useState } from 'react';
import { Text, View } from 'react-native';

function StaticsScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Statics!</Text>
    </View>
  );
}

export default StaticsScreen;
