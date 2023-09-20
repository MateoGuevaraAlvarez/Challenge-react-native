import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const MenuList = ({ menuData, onDelete }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    const priceSum = menuData.reduce((sum, item) => sum + item.precio, 0);
    setTotalPrice(priceSum);
  };

  const deleteItem = (id) => {
    onDelete(id);
  };

  return (
    <View>
      <Text>Total Price: {totalPrice}</Text>
      <FlatList
        data={menuData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre} - ${item.precio}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default MenuList;
