import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { MenuContext } from '../context/MenuContext.js';

const MenuList = ({ navigation }) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [searchText, setSearchText] = useState(''); // State for search input
  const { menu, setMenu } = React.useContext(MenuContext);

  useEffect(() => {
    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=5163b17d295b4d59a4d339fc3b2cbeeb&addRecipeInformation=true', {
      method: "GET",
    })
      .then(response => {
        if (!response.ok) {
          throw Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => setMenu(response))
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', handleResize);

    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  const onPressMoreInfo = (item) => {
    navigation.navigate('detalles', { plato: item });
  };

  const getTotalPrice = () => {
    if (menu && menu.results) {
      var total = menu.results.reduce((total, item) => total + (item.pricePerServing || 0), 0);
      return total.toFixed(2);
    }
    return 0;
  };

  const getAverageHealthScore = () => {
    if (menu && menu.results) {
      const totalHealthScore = menu.results.reduce((total, item) => total + (item.healthScore || 0), 0);
      const averageHealthScore = totalHealthScore / menu.results.length;
      return averageHealthScore.toFixed(2); // Redondea a dos decimales
    }
    return 0;
  };

  const onPressEliminar = (item) => {
    const updatedMenu = {
      ...menu,
      results: menu.results.filter((menuItem) => menuItem.id !== item.id),
    };
    setMenu(updatedMenu);
    console.log(updatedMenu);
  };

  const filteredMenu = menu && menu.results
    ? menu.results.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a menu item..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />

      <FlatList
        data={filteredMenu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.menuItem, { width: screenWidth - 32 }]}>
            <View style={styles.itemContent}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={3} style={styles.summary}>
                  {item.summary}
                </Text>
                <TouchableOpacity onPress={() => onPressMoreInfo(item)}>
                  <Text style={styles.moreInfoButton}>Más información</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressEliminar(item)}>
                  <Text style={styles.EliminarButton}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <Text style={styles.totalPriceText}>Total Price: ${getTotalPrice()}</Text>
      <Text style={styles.averageHealthScoreText}>Average Health Score: {getAverageHealthScore()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContent: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 8,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    color: '#666',
  },
  moreInfoButton: {
    color: 'blue',
    marginTop: 8,
  },
  EliminarButton: {
    color: 'red',
    marginTop: 8,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  averageHealthScoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default MenuList;
