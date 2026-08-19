import { cartContext } from "../context/CartProvider"
import type { cartType } from "../types/interfaces"
import { useContext } from "react"
const CartItem = ({item}:{item:cartType}) => {
    const product = item.product
    const quantity = item.quantity
    const context = useContext(cartContext)
    if(!context) throw new Error("Cart context is undefined")
    const {increaseQuantity,decreaseQuantity,removeFromCart} = context
    return (
    <div className="cart-item">
        <img src={product.images[0]} alt={product.name} />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <p>Stock:{product.stock}</p>
        <p>Quantity:{quantity}</p>
        <button className="qty-btn" onClick={()=>increaseQuantity(product._id)}> + </button>
        <button className="qty-btn" onClick={()=>decreaseQuantity(product._id)}> - </button>
        <button className="remove-btn" onClick={()=>removeFromCart(product._id)}>Remove Item</button>
    </div>
  )
}
export default CartItem