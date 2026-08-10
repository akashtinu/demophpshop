import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { customer, customerLogout } = useAuth();

  return (
    <nav className="navbar">
      <Link className="navbar__brand" to="/">
        DemoShop
      </Link>

      <div className="navbar__links">
        <Link className="navbar__link" to="/">
          Home
        </Link>
        {customer ? (
          <>
            <Link className="navbar__link" to="/my-orders">
              My Orders
            </Link>
            <button className="navbar__button" onClick={customerLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="navbar__link" to="/admin/login">
              Admin
            </Link>
            <Link className="navbar__link" to="/login">
              Login
            </Link>
            <Link className="navbar__link" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}