import { Link } from "react-router-dom";
import { useAuth, logoutUser } from "../../auth"

export default function Topnavbar({ setLeftMenu }) {

  const { login, setLogin, setToken } = useAuth()

  function logoutHandler(){
    logoutUser()
    setLogin(false)
    setToken(null)
  }

  return (
    <nav className="nav top-fixed p-1 box-shadow-down">
      <Link to="/">
        <h1 className="font-size-m">Indie Songs</h1>
      </Link>
      <button
        className="btn btn-icon btn-menu"
        onClick={() => setLeftMenu(true)}
      >
        <i className="fas fa-bars icon-med"></i>
      </button>
      <div class="profile">
        {!login ? (
          <>
            <Link to="/login">
              <button className="btn btn-link">Login / Register</button>
            </Link>
          </>
        ) : (
          <div classname="">
            {/* <p className="medium font-size-sm">Hi {user && user.username} !</p> */}
            <button className="btn btn-link" onClick={() => logoutHandler()}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
