import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
              <defs>
                <linearGradient id="lvMarkBg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffe48a" />
                  <stop offset="0.55" stopColor="#f5b938" />
                  <stop offset="1" stopColor="#d9831f" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="44" height="44" rx="14" fill="url(#lvMarkBg)" />
              <path d="M24 9c1.3 7.6 3.4 9.7 11 11-7.6 1.3-9.7 3.4-11 11-1.3-7.6-3.4-9.7-11-11 7.6-1.3 9.7-3.4 11-11z" fill="#1a0f45" />
              <circle cx="35" cy="34" r="2.6" fill="#1a0f45" />
              <circle cx="14" cy="34.5" r="1.5" fill="#1a0f45" opacity="0.7" />
            </svg>
            <span className="brand-text">
              <strong>Lucky<em>Vibe</em></strong>
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
