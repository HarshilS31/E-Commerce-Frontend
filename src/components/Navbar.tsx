import { NavLink } from "react-router-dom"
const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="navbar-container">
        <NavLink to='/products'>Products</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/checkout'>Checkout</NavLink>
        <NavLink to ='/cart'>Cart</NavLink>
    </div>
  </nav>
  )
}

export default Navbar