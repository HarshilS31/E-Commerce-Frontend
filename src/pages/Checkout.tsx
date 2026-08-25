import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { cartContext } from "../context/CartProvider";
import { createOrder, updatePaymentStatus } from "../api/order"
import { toast } from "react-toastify"

const Checkout = () => {
  const location  = useLocation()
  const totalAmount:number = location.state?.totalAmount;
  const context = useContext(cartContext)
  if(!context) {
    throw new Error("Cart context is undefined")
  }
  const {cartItems, clearCart} = context
  const [simulatedPayment,setSimulatedPayment] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false)
  const navigate = useNavigate()
  if (!totalAmount) {
    return (
      <div className="checkout">
        <p>No checkout session found.</p>
        <button className="btn-secondary" onClick={() => navigate('/cart')}>Return to Cart</button>
      </div>
    )
  }
  const simulatePayment = async () => {
    setProcessing(true)
    try {
      const orderItems = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }))
      const { order } = await createOrder(orderItems)
      await updatePaymentStatus(order._id, "simulated")

      setSimulatedPayment(true)
      clearCart()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Payment simulation failed")
    } finally {
      setProcessing(false)
    }
  }
  return (
    <div className="checkout">
        <h2>Total Payable Amount : ₹{totalAmount}</h2>
        <button className="btn-primary" onClick={simulatePayment} disabled={processing}>
          {processing ? "Processing..." : "Simulate Payment"}
        </button>
        <button className="btn-secondary" onClick={() => navigate("/cart")}>Return to Cart</button>
        {simulatedPayment && <div>
          <div className="payment-done">Payment of ₹{totalAmount} simulated successfully </div>
          <button onClick={()=>navigate("/products")}>Return to Products</button></div>}
    </div>
  )
}
export default Checkout