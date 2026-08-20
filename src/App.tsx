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
import CartProvider from "./context/CartProvider"
import AuthProvider from "./context/AuthProvider"
import ProtectedRoute from "./layout/ProtectedRoute"
import { ToastContainer,Slide } from "react-toastify"

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
        <Route element={<ProtectedRoute />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    )
  )

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}/>
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
            transition={Slide}
        />
      </CartProvider>
    </AuthProvider>
  )
}
export default App