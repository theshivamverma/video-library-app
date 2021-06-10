import axios from "axios";

export async function loginUser(username, password) {
  try {
    const { status, data } = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      {
        username,
        password,
      }
    );
    console.log({ status, data });
    if (status === 200) {
      localStorage.setItem(
        "vlib_login",
        JSON.stringify({ isLoggedIn: true, token: data.token })
      );
      return { success: true, token: data.token };
    }
  } catch (error) {
    console.log(error);
    return { token: null, success: false };
  }
}

export async function signupUser(name, email, username, password) {
  try {
    const { status: userStatus, data: userData } = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
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
      localStorage.setItem(
        "vlib_login",
        JSON.stringify({ isLoggedIn: true, token: userData.token })
      );
      return { success: true, token: userData.token };
    }
  } catch (error) {
    console.log(error);
    return { token: "", success: false };
  }
}

export function logoutUser() {
  localStorage.removeItem("vlib_login");
}

export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function setupAuthExceptionHandler(navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logoutUser();
        navigate("login");
      }
      return Promise.reject(error);
    }
  );
}
