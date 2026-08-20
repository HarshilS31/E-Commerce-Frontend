import { useState, type FormEvent } from "react"
import type { Category, Product } from "../../types/interfaces"
import { createProduct, updateProduct } from "../../api/product"
import { toast } from "react-toastify"
import type {ProductFormProps} from "../../types/interfaces"
 
const getCategoryId = (category: Product["category"] | undefined): string => {
  if (!category) return ""
  if (typeof category === "object" && category !== null && "_id" in category) {
    return (category as { _id: string })._id
  }
  return category as string
}

const ProductForm = ({ categories, editingProduct, onDone, onCancel }: ProductFormProps) => {
  const isEditMode = !!editingProduct
  const [name, setName] = useState(editingProduct?.name ?? "")
  const [description, setDescription] = useState(editingProduct?.description ?? "")
  const [price, setPrice] = useState(editingProduct?.price?.toString() ?? "")
  const [stock, setStock] = useState(editingProduct?.stock?.toString() ?? "")
  const [category, setCategory] = useState(getCategoryId(editingProduct?.category))
  const [images, setImages] = useState<FileList | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (isEditMode && editingProduct) {
        await updateProduct(editingProduct._id, {name,description,price: Number(price),stock: Number(stock),category,images: editingProduct.images})
        toast.success("Product updated")
      } else {
        if (!images || images.length === 0) {
          toast.error("Please select at least one image")
          setSubmitting(false)
          return
        }
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", price)
        formData.append("stock", stock)
        formData.append("category", category)
        Array.from(images).forEach(file => formData.append("images", file))
        await createProduct(formData)
        toast.success("Product created")
      }
      onDone()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input required value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Description
        <textarea required value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        Price
        <input required type="number" min="0.01" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <label>
        Stock
        <input required type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} />
      </label>
      <label>
        Category
        <select required value={category} onChange={e => setCategory(e.target.value)}>
          <option value="" disabled>Select a category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </label>

      {isEditMode ? (
        <p className="existing-images-note">
          Keeping the {editingProduct?.images.length ?? 0} existing image(s) - re-uploading on edit isn't supported yet.
        </p>
      ) : (
        <label>
          Images
          <input required type="file" accept="image/*" multiple onChange={e => setImages(e.target.files)} />
        </label>
      )}

      <div className="product-form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
        </button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default ProductForm