import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth, loginUser } from "../auth"
import { useToast } from "../utilities/Toast"
import { usePlaylist } from "../playlist"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorUsername, setErrorUsername] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const { setPlaylistsData } = usePlaylist()
  const { login, setLogin, setToken } = useAuth();
  const { callToast } = useToast();

  const { state } = useLocation();

  const navigate = useNavigate();

  login && navigate(state?.from ? state.from : "/")

  function checkForUsername(){
    if(username !== ""){
      setErrorUsername("")
    }else{
      setErrorUsername("username is required")
    }
  }

  function checkForPassword() {
    if (password !== "") {
      setErrorPassword("");
    } else {
      setErrorPassword("password is required");
    }
  }

  async function loginHandler(){
    checkForUsername()
    checkForPassword()
    if(errorPassword === "" && errorUsername === ""){
      const { success, token } = await loginUser(username, password);
      console.log({ success, token })
      if (success) {
        setLogin(true)
        setToken(token)
        setPlaylistsData()
        callToast("SUCCESS_TOAST","Login successful");
      } else {
        callToast("ERROR_TOAST", "Wrong credentials");
      }
    }else{
        callToast( "ERROR_TOAST", "Enter proper credentials" );
    }
  }


  return (
    <div className="login-container centered box-shadow-down p-2-1 border-round">
      <h1 className="font-size-l medium center">User login</h1>
      <label
        className={errorUsername ? "inputgroup error" : "inputgroup"}
        style={{ borderBottom: "none" }}
      >
        <input
          className="input-textbox focus-blue"
          placeholder=" "
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => checkForUsername}
        />
        <span className="input-label">Username</span>
        {errorUsername !== "" && (
          <span class="error-text">{errorUsername}</span>
        )}
      </label>
      <label
        className={errorPassword ? "inputgroup error" : "inputgroup"}
        style={{ borderBottom: "none" }}
      >
        <input
          type="password"
          className="input-textbox focus-blue"
          placeholder=" "
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => checkForPassword()}
        />
        <span className="input-label">Password</span>
        {errorPassword !== "" && (
          <span class="error-text">{errorPassword}</span>
        )}
      </label>
      <button
        className="btn btn-col btn-primary border-round btn-block"
        onClick={() => loginHandler()}
      >
        Login
      </button>
      <p className="mt-1 center">
        Are you a New user then{" "}
        <Link to="/register">
          <span className="underline">Register</span>
        </Link>
      </p>
    </div>
  );
}
