import { createContext, useContext, useState,useEffect } from 'react';

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
    const token = response.token;

    // Si la autenticación es exitosa, actualiza el estado del usuario
    setUser({ email, token });
} catch (error) {
    // Maneja los errores de inicio de sesión, por ejemplo, muestra un mensaje de error
    console.error('Error al iniciar sesión:', error);
} finally {
    setLoading(false);
}
};

function fakeLogin(email, password) {
// FALTA EL INICIO EL FETCH AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!
return new Promise((resolve, reject) => {
    setTimeout(() => {
    if (email === 'challenge@alkemy.org' && password === 'react') {
        useEffect(() => {
            fetch('http://challenge-react.alkemy.org/',{
              method:"POST",
            })
            .then(response => response.json())
            .then(response  => setMenuData(response))
            .catch(err => console.log(err))
          }, []);
        

    }

    reject(new Error('Usuario o contraseña incorrectos'));
    }, 1000);
})
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