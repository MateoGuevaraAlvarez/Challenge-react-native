import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MenuList from './MenuList';
//api key 5163b17d295b4d59a4d339fc3b2cbeeb
const App = () => {
  const [menuData, setMenuData] = useState([]);
  const [averageHealthscore, setAverageHealthscore] = useState(0);

  useEffect(() => {
    // Aquí deberías hacer una solicitud a la API real para obtener los datos del menú
    // En lugar de cargar el JSON localmente.
    // Ejemplo:
    // fetch('URL_DE_TU_API')
    //   .then(response => response.json())
    //   .then(data => setMenuData(data.menu))
    const data = require('./menuData.json');
    setMenuData(data.menu);
  }, []);

  useEffect(() => {
    const healthscoreSum = menuData.reduce((sum, item) => sum + item.healthscore, 0);
    setAverageHealthscore(healthscoreSum / menuData.length);
  }, [menuData]);

  const deleteItem = (id) => {
    const updatedMenu = menuData.filter((item) => item.id !== id);
    setMenuData(updatedMenu);
  };

  return (
    <View>
      <Text>Promedio Healthscore: {averageHealthscore}</Text>
      <MenuList menuData={menuData} onDelete={deleteItem} />
    </View>
  );
};

export default App;
