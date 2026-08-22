import { useEffect, useState, type FormEvent } from "react"
import type { ProductQueryParams,  Product, CategoryResponse } from "../types/interfaces"
import { getAllCategories } from "../api/category"
import { filterProducts } from "../api/product"
import { toast } from "react-toastify"
import ProductCard from "../components/ProductCard"

const SearchBar = () => {
    const [getCategories, setGetCategories] = useState<CategoryResponse | null>(null)
    const [formInput,setFormInput] = useState<ProductQueryParams>({})
    const[products,setProducts] = useState<Product[]>([])
    const [loading,setLoading] = useState<boolean>(true)
    const handleSubmit = async (e:FormEvent) =>{
        e.preventDefault()
        const res = await filterProducts(formInput)
        setProducts(res.products)
    }
    useEffect(()=>{
        const fetchCategories = async() => {
            try {
                const data =await  getAllCategories()
                setGetCategories(data)
            }catch(err) {
                console.error(err)
                toast.error(`Error:${err}`)
            }finally {
                setLoading(false)
            }
        }
        console.log(getCategories)
        fetchCategories()
    },[])

  return (
    <div className="search-bar">
        <form className="search-form" onSubmit={handleSubmit}>
            <label htmlFor="product-name">Product name:
            <input type="text" value={formInput.search} onChange={(e)=>setFormInput({...formInput,search:e.target.value})}/>
             </label>
            <select  value={formInput.category} onChange={(e)=>setFormInput({...formInput,category:e.target.value})}>
              <option value="">Select a Category</option>
              {getCategories?.categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} 
                </option>
              ))}
            </select>
            <input type="text" placeholder="Min Price" value={formInput.minPrice} onChange={(e)=>setFormInput({...formInput,minPrice:Number(e.target.value)})}/>
            <input type="text" placeholder="Max Price" value={formInput.maxPrice} onChange={(e)=>setFormInput({...formInput,maxPrice:Number(e.target.value)})}/>
            <select value={formInput.sort || ""} name="sort" onChange={(e) => setFormInput({ ...formInput, sort: e.target.value === "" ? undefined : e.target.value as ProductQueryParams["sort"] })}>
                <option value="">Sort by Price</option>
                <option value="price_asc">Low to High</option>
                <option value="price_desc">High to Low</option>
            </select>
            <button type="submit">Seacrh Items</button>
        </form>
        {products.length==0 ? <h2>No Products found</h2> : <div className="product-grid">
            {products.map(product => (
                <div key={product._id}>
                    <ProductCard product={product}/>
                </div>
            ))}
        </div>}
    </div>
  )
}

export default SearchBar