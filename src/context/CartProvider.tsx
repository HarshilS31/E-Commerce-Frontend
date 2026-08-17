import { createContext, useState } from "react"
import type { cartType, cartContextType,CartContextProps } from "../types/interfaces"
export const cartContext = createContext<cartContextType | undefined>(undefined)

const CartProvider = ({ children }: CartContextProps) => {
  const [cartItems, setCartItems] = useState<cartType[]>([])

  const addToCart = (item: cartType) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        cartItem => cartItem.product._id === item.product._id
      )
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.product._id === item.product._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }
  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      return prev.filter(item => item.product._id !== productId)
    })
  }
  const increaseQuantity = (productId: string) => {
    setCartItems(prev=>{
         return prev.map(item =>
          item.product._id === productId ?  {...item,quantity:item.quantity+1} : item
        )
    })
  }
  const decreaseQuantity = (productId: string) => {
      setCartItems(prev =>
          prev.map(item =>
                  item.product._id === productId
                      ? { ...item, quantity: item.quantity - 1 }
                      : item
              ).filter(item => item.quantity > 0)
      )
  }
  const clearCart = () => {
    setCartItems([])
  }
  return (
    <cartContext.Provider value ={{cartItems,addToCart,removeFromCart,increaseQuantity,decreaseQuantity,clearCart}}>
      {children}
    </cartContext.Provider>
  )
}

export default CartProvider