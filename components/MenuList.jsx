import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MenuContext } from '../context/MenuContext.js';


const MenuList = () => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const {menu, setMenu} = React.useContext(MenuContext)
  useEffect(() => {

    fetch('https://api.spoonacular.com/recipes/complexSearch?apiKey=5163b17d295b4d59a4d339fc3b2cbeeb&addRecipeInformation=true', {
      method: "GET",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(response => setMenu(response))
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Handle the error, e.g., show an error message to the user
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
    // Implement your logic for more info button press
  };
  
  const onPressEliminar = (item) => {
    // Implement your logic for delete button press
  };
  

  //no funciona el flatlist!!!! :,vasdasdasd
  return (
    <>
    {menu && (<View style={styles.container}>
      <FlatList
        data={menu}
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
                  <Text style={styles.EliminarButton}>eliminar</Text>
                </TouchableOpacity>
              </View> 
            </View>
          </View>
        )}
      />
    </View>)}
    </>
    
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
    flexDirection: 'row', // Coloca los elementos en una fila
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
});

export default MenuList;
