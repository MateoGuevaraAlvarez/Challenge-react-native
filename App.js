import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MenuList from './components/MenuList.jsx';
//api key 5163b17d295b4d59a4d339fc3b2cbeeb
const App = () => {
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
    <View>
      <MenuList menuData={menuData} />
    </View>
  );
};

export default App;
