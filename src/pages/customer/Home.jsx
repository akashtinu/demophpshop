import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/list.php").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="page">
      <div className="product-grid">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="product-card">
            <img className="product-card__image" src={p.image_url} alt={p.name} />
            <div>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}