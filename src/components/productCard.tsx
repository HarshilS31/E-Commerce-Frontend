import { Link } from "react-router-dom"
import type { ProductCardProps } from "../types/interfaces"
const ProductCard = ({product}:ProductCardProps) => {
  return (
      <div className="product-card">
        <img src={product.images[0]} alt={product.name} />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <p>Stock:{product.stock}</p>
        <Link to={`/product/${product._id}`}>View Details</Link>
      </div>
  )
}
export default ProductCard