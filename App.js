import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuList from './components/MenuList.jsx';
import LoginScreen from './components/LoginScreen.jsx'
import {AuthProvider} from './context/AuthContext.js'
import {MenuProvider} from './context/MenuContext.js'




const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <MenuProvider>
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{
                headerShown: false,
              }}/>
        <Stack.Screen name="menu" component={MenuList} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
    </MenuProvider>
  );
};

export default App;
