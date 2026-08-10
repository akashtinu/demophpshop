import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/detail.php?id=${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="page">
      <div className="product-detail form-card">
        <img className="product-detail__image" src={product.image_url} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
          <p>Size: {product.size}</p>
          <button className="primary" onClick={() => navigate(`/order/${product.id}`)}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}