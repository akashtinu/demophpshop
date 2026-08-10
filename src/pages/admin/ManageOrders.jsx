import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => api.get("/admin/orders/list.php").then((res) => setOrders(res.data));

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    await api.post("/admin/orders/update-status.php", { id, status });
    fetchOrders();
  };

  return (
    <div className="page" >
      <div className="form-card" >
        <h2>Manage Orders</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Customer</th><th>Product</th><th>Qty</th><th>Phone</th><th>Address</th><th>Status</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.customer_name}</td>
                  <td>{o.product_name}</td>
                  <td>{o.quantity}</td>
                  <td>{o.phone}</td>
                  <td>{o.address}</td>
                  <td>
                    <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}