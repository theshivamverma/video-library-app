import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { setupAuthHeaderForServiceCalls } from "."

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { isLoggedIn, token: storedToken } = JSON.parse(
    localStorage?.getItem("vlib_login")
  ) || { isLoggedIn: false, token: null };

  const [login, setLogin] = useState(isLoggedIn);
  const [token, setToken] = useState(storedToken)
  const [user, setUser] = useState(undefined);

  token && setupAuthHeaderForServiceCalls(token)

  useEffect(() => {
    if (login && token) {
      setUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login , token]);


  async function setUserData() {
    try {
      const {
        status,
        data: { user },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/userdetail`
      );
      if (status === 200) {
        setUser({ ...user });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, user, token, setLogin, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
