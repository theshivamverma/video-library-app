import { Link } from "react-router-dom";

export default function LeftNavbar({ leftMenu, setLeftMenu }) {
  return (
    <nav
      className={leftMenu ? "leftfixed-nav active p-1" : "leftfixed-nav p-1"}
    >
      <div className="top-element">
        <h3 className="uppercase letter-spaced">Indie-Songs</h3>
        <button
          className="m-0-05 btn btn-icon"
          onClick={() => setLeftMenu(false)}
        >
          <i className="fas fa-times icon-med" id="menu-close"></i>
        </button>
      </div>
      <Link to="/">
        <button
          className="btn btn-block btn-link box-shadow-down"
          onClick={() => setLeftMenu(false)}
        >
          Home
        </button>
      </Link>
      <Link to="/playlist">
        <button
          className="btn btn-block btn-link box-shadow-down mt-1"
          onClick={() => setLeftMenu(false)}
        >
          Playlist
        </button>
      </Link>
    </nav>
  );
}
