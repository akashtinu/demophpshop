import { useEffect, useState } from "react";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function MyOrders() {
  const { customer } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get(`/orders/customer.php?customer_id=${customer.id}`).then((res) => setOrders(res.data));
  }, [customer]);

  return (
    <div className="page">
      <div className="form-card">
        <h2>My Orders</h2>
        <div className="order-list">
          {orders.map((o) => (
            <div key={o.id} className="order-card">
              <p>Product: {o.product_name}</p>
              <p>Qty: {o.quantity}</p>
              <p>Status: {o.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}