import Home from "./pages/Home.jsx";
import NaruciTortu from "./pages/NaruciTortu.jsx";

const routes = {
  "/": Home,
  "/naruci-tortu": NaruciTortu,
};

function App() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const Page = routes[pathname] || Home;

  return (
    <>
      <div className="desktop-gate" role="status" aria-live="polite">
        <img src="/logo.jpg" alt="Tortice Bento Torte logo" />
        <p>Trenutno smo samo na mobile verziji.</p>
      </div>

      <main className="mobile-site">
        <Page />
      </main>
    </>
  );
}

export default App;
