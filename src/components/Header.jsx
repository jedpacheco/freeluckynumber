import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <span className="brand-orb">7</span>
            <span>
              <strong>LuckyVibe</strong>
              <small>Daily</small>
            </span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainMenu"
            aria-controls="mainMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainMenu">
            <div className="navbar-nav ms-auto align-items-lg-center">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/daily">Daily</NavLink>
              <NavLink className="nav-link" to="/generators">Generators</NavLink>
              <NavLink className="nav-link" to="/odds">Odds</NavLink>
              <NavLink className="nav-link" to="/articles">Articles</NavLink>
              <NavLink className="nav-link" to="/about">About</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
