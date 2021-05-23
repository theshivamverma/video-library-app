import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem("vlib_login")) {
      setLogin(JSON.parse(localStorage.getItem("vlib_login")));
      setUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setUserData() {
    try {
      const {
        status,
        data: { user },
      } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/${localStorage.getItem(
          "vlib_user_id"
        )}`
      );
      if (status === 200) {
        setUser({ ...user });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function setUserLogin(userId) {
    setLogin(true);
    localStorage.setItem("vlib_login", true);
    localStorage.setItem("vlib_user_id", userId);
    setUserData();
    return {id: userId, success: true};
  }

  function userLogout() {
    setLogin(false);
    setUser(null)
    localStorage.removeItem("vlib_login");
    localStorage.removeItem("vlib_user_id");
  }

  async function loginUser(username, password) {
    try {
      const { status, data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth`,
        {
          username,
          password,
        }
      );
      if (status === 200) {
        return setUserLogin(data.user[0]._id);
      }
    } catch (err) {
      return {id: "", success: false};
    }
  }

  async function registerUser(name, email, username, password) {
    try {
      const { status: userStatus, data: userData } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user`,
        {
          user: {
            name,
            username,
            email,
            password,
          },
        }
      );
      if (userStatus === 200) {
        return setUserLogin(userData.savedUser._id)
      }
    } catch (error) {
      return {id: "", success: false}
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, user, loginUser, registerUser, userLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
