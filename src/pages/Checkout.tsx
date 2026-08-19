import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { cartContext } from "../context/CartProvider";

const Checkout = () => {
  const location  = useLocation()
  const totalAmount:number = location.state?.totalAmount;
  const context = useContext(cartContext)
  if(!context) {
    throw new Error("Cart context is undefined")
  }
  const {clearCart} =context
  const [simulatedPayment,setSimulatedPayment] = useState<boolean>(false);
  const navigate = useNavigate()
  if (!totalAmount) {
    return (
      <div className="checkout">
        <p>No checkout session found.</p>
        <button className="btn-secondary" onClick={() => navigate('/cart')}>Return to Cart</button>
      </div>
    )
  }
  const simulatePayment = () => {
    setSimulatedPayment(true)
    clearCart()
  }
  return (
    <div className="checkout">
        <h2>Total Payable Amount : ₹{totalAmount}</h2>
        <button  className="btn-primary" onClick={()=>simulatePayment()}>Simulate Payment</button>
        <button className="btn-secondary" onClick={() => navigate("/cart")}>Return to Cart</button>
        {simulatedPayment && <div>
          <div className="payment-done">Payment simulated successfully of  ₹{totalAmount}</div>
          <button onClick={()=>navigate("/products")}>Return to Products</button></div>}
    </div>
  )
}
export default Checkout