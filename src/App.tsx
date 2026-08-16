import Home from "./pages/Home"
import Login from "./pages/Login"
import ProductDetails from "./pages/ProductDetails"
import Products from "./pages/Products"
import { Route,RouterProvider,createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Register from "./pages/Register"
import Checkout from "./pages/Checkout"
import AdminDashboard from "./pages/AdminDashboard"
import RootLayout from "./layout/RootLayout"
import Cart from "./pages/Cart"
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}
export default App