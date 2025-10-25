import logo from "../assets/holberton-logo.jpg";

function Header() {
  return (
    <header className="App-header flex items-center py-6 px-8">
      <img
        src={logo}
        alt="Holberton logo"
        className="h-12 w-auto mr-4 object-contain"
      />
      <h1 className="text-3xl font-bold text-[var(--main-color)]">
        School Dashboard
      </h1>
    </header>
  );
}

export default Header;
