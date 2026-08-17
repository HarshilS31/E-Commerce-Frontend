import { Link } from "react-router-dom"
import type { ProductCardProps } from "../types/interfaces"
import { cartContext } from "../context/CartProvider"
import { useContext } from "react"
import { toast } from "react-toastify"
const ProductCard = ({product}:ProductCardProps) => {
  const context = useContext(cartContext)
  if(!context) {
    throw new Error("Cart context is undefined")
  }
  const {addToCart} = context
  const addedToCart  = () =>{
    addToCart({product,quantity: 1})
    toast.success("Item added to cart")
  }
  return (
      <div className="product-card">
        <img src={product.images[0]} alt={product.name} />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <p>Stock:{product.stock}</p>
        <Link to={`/products/${product._id}`}>View Details</Link>
        <button className="add-to-cart-btn" onClick={()=>addedToCart()}>Add to Cart</button>
        
        
      </div>
  )
}
export default ProductCard