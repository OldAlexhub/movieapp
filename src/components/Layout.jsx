import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Layout = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Clear local storage and cookies
    ["token", "userId", "username", "role", "email"].forEach((item) => {
      localStorage.removeItem(item);
      Cookies.remove(item);
    });
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            MyApp
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {!token ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/mysearchpage">
                      Search & Add
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/watchlist">
                      Watch List
                    </NavLink>
                  </li>
                  {role === "admin" && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin">
                        Admin
                      </NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {username && (
                <li className="nav-item">
                  <span className="nav-link disabled">Hello, {username}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
