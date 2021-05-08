export default function Topnavbar({ setLeftMenu }) {
  return (
    <nav className="nav top-fixed p-1 box-shadow-down">
      <h1 className="font-size-m">Indie Songs</h1>
      <button className="btn btn-icon" onClick={() => setLeftMenu(true)}>
        <i className="fas fa-bars icon-med"></i>
      </button>
    </nav>
  );
}
