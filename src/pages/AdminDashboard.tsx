import { useState, useEffect, useCallback } from "react"
import { getProducts, deleteProduct } from "../api/product"
import { getAllCategories } from "../api/category"
import type { Product, Category } from "../types/interfaces"
import ProductTable from "../components/admin/ProductTable"
import ProductForm from "../components/admin/ProductForm"
import CategoryManager from "../components/CategoryManager"
import { toast } from "react-toastify"

type Tab = "products" | "categories"

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("products")
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  const loadProducts = useCallback(async () => {
    try {
      const res = await getProducts()
      setProducts(res.products)
    } catch {
      toast.error("Failed to load products")
    }
  }, [])

  const loadCategories = useCallback(async () => {
    try {
      const res = await getAllCategories()
      setCategories(res.categories)
    } catch {
      toast.error("Failed to load categories")
    }
  }, [])

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [loadProducts, loadCategories])

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return
    try {
      await deleteProduct(id)
      toast.success("Product deleted")
      loadProducts()
    } catch {
      toast.error("Failed to delete product")
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleCreateNew = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleFormDone = () => {
    setShowForm(false)
    setEditingProduct(null)
    loadProducts()
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-tabs">
        <button onClick={() => setTab("products")} disabled={tab === "products"}>Products</button>
        <button onClick={() => setTab("categories")} disabled={tab === "categories"}>Categories</button>
      </div>

      {tab === "products" && (
        <>
          {showForm ? (
            <ProductForm
              categories={categories}
              editingProduct={editingProduct}
              onDone={handleFormDone}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <>
              <button className="btn-primary" onClick={handleCreateNew}>+ New Product</button>
              <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
            </>
          )}
        </>
      )}

      {tab === "categories" && (
        <CategoryManager categories={categories} onChange={loadCategories} />
      )}
    </div>
  )
}

export default AdminDashboard