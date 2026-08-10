import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { adminLogout } = useAuth();
  return (
    <div className="page page--dashboard">
      <div className="form-card">
        <h2 style={{textAlign:"center"}}>Admin Dashboard</h2>
        <div className="admin-actions">
          <Link className="navbar__link" to="/admin/products" style={{margin:"40px"}} > 
            Manage Products
          </Link>
          <Link className="navbar__link" to="/admin/orders" style={{margin:"40px"}}>
            Manage Orders
          </Link>
          {/* <button className="secondary" onClick={adminLogout}>
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
}