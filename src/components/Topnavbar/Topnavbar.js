export default function Topnavbar({ setLeftMenu }) {
  return (
    <nav class="nav top-fixed p-1 box-shadow-down">
      <h1 class="font-size-m">Indie Songs</h1>
      <button class="btn btn-icon" onClick={() => setLeftMenu(true) }>
        <i class="fas fa-bars icon-med"></i>
      </button>
    </nav>
  );
}
