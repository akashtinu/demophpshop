import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", size: "", image_url: "" });
  const [editId, setEditId] = useState(null);

  const fetchProducts = () => api.get("/admin/products/list.php").then((res) => setProducts(res.data));

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.post(`/admin/products/update.php`, { id: editId, ...form });
    } else {
      await api.post("/admin/products/create.php", form);
    }
    setForm({ name: "", description: "", price: "", size: "", image_url: "" });
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, description: p.description, price: p.price, size: p.size, image_url: p.image_url });
    setEditId(p.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.post("/admin/products/delete.php", { id });
    fetchProducts();
  };

  return (
    <div className="page">
      <div className="form-card">
        <h2>Manage Products</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input name="size" placeholder="Size" value={form.size} onChange={handleChange} />
          <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
          <button className="primary" type="submit">{editId ? "Update" : "Add"} Product</button>
        </form>
      </div>

      <div className="form-card table-wrapper">
        <table>
          <thead>
            <tr><th>Name</th><th>Price</th><th>Size</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.size}</td>
                <td>
                  <button style={{backgroundColor:"yellow"}} className="secondary" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="secondary" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}