import React from "react";
import { View, Text, Button, Image } from "react-native";
import { Table, Row, Cell } from "react-native-table-component";

const Detalles = ({ route, navigation }) => {
  const { plato } = route.params;
 //no se ve la imagen :((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image source={{ uri: plato.image.url }} style={{ width: 200, height: 200 }} />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{plato.title}</Text>
        <Text style={{ fontSize: 16 }}>{plato.summary}</Text>
        <View style={{ marginTop: 16 }}>
          <Table>
            <Row data={["Gluten free", plato.glutenFree ? "Sí" : "No"]} />
            <Row data={["Health score", plato.healthScore]} />
            <Row data={["Price per serving", `$${plato.pricePerServing}`]} />
          </Table>
        </View>
      </View>
      <Button title="Volver" onPress={() => navigation.goBack()} style={{ width: 200, height: 200 }}/>
    </View>
  );
};

export default Detalles;