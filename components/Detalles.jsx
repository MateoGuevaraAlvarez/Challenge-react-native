import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { StyleSheet } from "react-native";
import Table from 'react-native-table';
//no funciona la tabla

const Detalles = ({ route, navigation }) => {
  const { plato } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: plato.image.url }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{plato.title}</Text>
        <Text style={styles.summary}>{plato.summary}</Text>

        <Table>
          <TableRow>
            <TableCell>Gluten free</TableCell>
            <TableCell>{plato.glutenFree ? "Sí" : "No"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Health score</TableCell>
            <TableCell>{plato.healthScore}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Price per serving</TableCell>
            <TableCell>${plato.pricePerServing}</TableCell>
          </TableRow>
        </Table>
      </View>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  summary: {
    fontSize: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableCell: {
    padding: 8,
  },
});

export default Detalles;