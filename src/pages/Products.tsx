import { useEffect, useState } from "react"
import { getProducts } from "../api/product"
import type { Product, ProductResponse } from "../types/interfaces"
import ProductCard from "../components/productCard"

const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data: ProductResponse = await getProducts()
                setProducts(data.products)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product._id}>
                    <ProductCard product={product}/>
                </div>
            ))}
        </div>
    )
}

export default Products