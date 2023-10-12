import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // El estado del usuario
  const [loading, setLoading] = useState(false); // Estado de carga

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await fakeLogin(email, password); // Simulación de inicio de sesión

      // Si la autenticación es exitosa, actualiza el estado del usuario
      setUser({ email, response });
    } catch (error) {
      // Maneja los errores de inicio de sesión, por ejemplo, muestra un mensaje de error
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  const fakeLogin = async (email, password) => {
    let token;
    try {
      const response = await fetch("http://challenge-react.alkemy.org/?email="+ email +"&password=" + password, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        token = data;
      } else {
        console.log("Request failed:", response.status);
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
    }
    return token;
  };

  const logout = async () => {
    setUser(null);
  };

  const signup = async (email, password) => {
    // Lógica de registro aquí
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/*La autenticación basada en tokens es un protocolo de autenticación en el que los usuarios verifican su identidad a cambio de un token de acceso único. Los usuarios pueden entonces acceder al sitio web, la aplicación o el recurso durante la vida del token sin tener que volver a introducir sus credenciales.*/
/*El token se genera en el servidor y se envía al cliente. El cliente almacena el token y lo envía al servidor en cada solicitud. El servidor verifica el token y responde con los datos solicitados si el token es válido.*/
