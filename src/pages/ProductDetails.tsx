import { useParams } from "react-router-dom"
import type { Product } from "../types/interfaces"
import {  useContext, useEffect, useState } from "react"
import { getProductById } from "../api/product"
import type { cartType } from "../types/interfaces"
import { cartContext } from "../context/CartProvider"
import { toast } from "react-toastify"
const ProductDetails = () => {
  const [product,setProduct] = useState<Product | null>(null)
  const [loading,setLoading] = useState<boolean>(true)
  const {id} = useParams()
  useEffect(()=>{
  const fetchProduct = async () => {
    if(!id) return
    try {
      const data = await getProductById(id)
      setProduct(data.product)
    }catch(error) {
      console.error(error)
    }finally {
      setLoading(false)
    }
  }
  fetchProduct()
  },[id])
  console.log(product?.name)
  
  if(loading) {
    return (
      <div className="Loader">Loading...</div>
    )
  }
  if(!product) {
    return <div>Product not found!</div>
  }
  const context = useContext(cartContext)
  if(!context) {
    throw new Error("Cart context isn undefined")
  }
  const {addToCart} = context
  const addedToCart  = () =>{
    addToCart({product,quantity: 1})
    toast.success("Item added to cart")
  }
  return (
    <div className="product-details">
        <div>
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <p>₹{product?.price}</p>
        <p>Stock: {product?.stock}</p>
        <img src={product?.images[0]} alt={product?.name} />
        <button className="add-to-cart-btn" onClick={()=>addedToCart()}>Add to Cart</button>
    </div>
    </div>
  )
}

export default ProductDetails