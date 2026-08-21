import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div className="home">
    <section className="hero">
        <div className="hero-content">
            <p className="hero-eyebrow">MODERN E-COMMERCE</p>
            <h1 className="hero-title">Everything you need. One place.</h1>
            <p className="hero-description">
                Discover quality products with a simple and seamless shopping experience.
            </p>
            <Link className="hero-button" to="/products">
                Explore Products
            </Link>
        </div>
    </section>


</div>
  )
}

export default Home