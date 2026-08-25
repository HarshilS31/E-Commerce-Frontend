import {  useContext } from "react"
import { cartContext } from "../context/CartProvider"

import CartItem from "../components/CartItem"
import type { cartType } from "../types/interfaces"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const context = useContext(cartContext)
  const navigate = useNavigate()
  if(!context) {
    throw new Error("Cart context is undefined")
  }
  const {cartItems,clearCart} = context
   let totalAmount:number = cartItems.reduce((acc,item)=>acc+item.product.price*item.quantity,0)
  if(cartItems.length==0) {
    return (
      <h2 className="empty-cart">Your Cart is Empty</h2>
    )
  }
  return (
    <div className="cart-products">
      {cartItems.map((item: cartType)=>(
        <div key={item.product._id}>
          <CartItem item={item} />
        </div>
      ))}
      <h2>Total Amount: ₹{totalAmount}</h2>
      <button className="btn-secondary" onClick={()=>clearCart()}>Clear Cart</button>
      <button  className="btn-primary" onClick={()=>navigate("/checkout",{ state:{totalAmount}})}>Checkout</button>

    </div>
  )
}
export default Cart
