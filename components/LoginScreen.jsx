import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuth } from '../context/AuthContext.js';
function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();

  const handleLogin = async () => {
    try{
        await login(username,password)
        navigation.navigate("menu");
        
    }catch(error){
        console.error(error);
    }
    
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2", // Color de fondo
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#333", // Color del título
        }}
      >
        Iniciar Sesión
      </Text>
      <TextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={{
          width: 250,
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 15,
          backgroundColor: "#fff", // Color de fondo del campo de entrada
        }}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={{
          width: 250,
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 10,
          marginBottom: 15,
          backgroundColor: "#fff", // Color de fondo del campo de entrada
        }}
      />
      <Button
        title="Iniciar Sesión"
        onPress={handleLogin}
        color="#007AFF" // Color del botón
      />
    </View>
  );
}

export default LoginScreen;
