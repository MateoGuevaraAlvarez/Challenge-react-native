import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const MenuList = ({ menuData, onPressMoreInfo }) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', handleResize);

    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={menuData.results}
        keyExtractor={(item) => item.id.toString()}
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
