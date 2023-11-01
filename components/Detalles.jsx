import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { Table, Row, Cell } from "react-native-table-component";

const Detalles = ({ route, navigation }) => {
  const { plato } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: plato.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{plato.title}</Text>
        <Text style={styles.summary}>{plato.summary}</Text>
        <View style={styles.tableContainer}>
          <Table>
            <Row data={["Gluten free", plato.glutenFree ? "Sí" : "No"]} style={styles.row} textStyle={styles.cellText} />
            <Row data={["Health score", plato.healthScore]} style={styles.row} textStyle={styles.cellText} />
            <Row data={["Price per serving", `$${plato.pricePerServing}`]} style={styles.row} textStyle={styles.cellText} />
          </Table>
        </View>
      </View>
      <Button title="Volver" onPress={() => navigation.goBack()} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  tableContainer: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  row: {
    height: 40,
  },
  cellText: {
    textAlign: "center",
  },
  button: {
    marginTop: 16,
    width: 200,
    height: 40,
  },
});

export default Detalles;