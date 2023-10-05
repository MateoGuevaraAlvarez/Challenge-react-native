import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuList from './components/MenuList.jsx';
import LoginScreen from './components/LoginScreen.jsx'
//api key 5163b17d295b4d59a4d339fc3b2cbeeb
const App = () => {
  const Stack = createNativeStackNavigator();
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=5163b17d295b4d59a4d339fc3b2cbeeb&addRecipeInformation=true',{
      method:"GET",
    })
    .then(response => response.json())
    .then(response  => setMenuData(response))
    .catch(err => console.log(err))
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="menu" component={MenuList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
