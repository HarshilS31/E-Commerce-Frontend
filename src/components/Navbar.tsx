import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { authContext } from "../context/AuthProvider"
import { toast } from "react-toastify"
const Navbar = () => {
  const auth = useContext(authContext)
  const navigate = useNavigate()
  const handleLogout = async () => {
    await auth?.logout()
    navigate("/login")
    toast.success("Logged out successfully")
  }
  return (
    <nav className="navbar">
    <div className="navbar-container">
        <NavLink to='/products'>Products</NavLink>
        {!auth?.loading && (
          auth?.user ? (
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <NavLink to='/login'>Login</NavLink>
              <NavLink to='/register'>Register</NavLink>
            </>
          )
        )}
        <NavLink to='/checkout'>Checkout</NavLink>
        <NavLink to ='/cart'>Cart</NavLink>
        <NavLink to='/search'>SearchBar</NavLink>
    </div>
  </nav>
  )
}
export default Navbar