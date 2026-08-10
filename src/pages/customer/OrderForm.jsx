import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function OrderForm() {
  const { id } = useParams();
  const { customer } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    quantity: 1,
    address: "",
    phone: customer?.phone || "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/orders/create.php", {
        product_id: id,
        customer_id: customer.id,
        ...form,
      });
      alert("Order placed!");
      navigate("/my-orders");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="page">
      <div className="form-card">
        <h2>Place Order</h2>
        <form onSubmit={handleSubmit}>
          <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} required />
          <textarea name="address" placeholder="Delivery Address" onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <button className="primary" type="submit">Place Order (COD)</button>
        </form>
      </div>
    </div>
  );
}