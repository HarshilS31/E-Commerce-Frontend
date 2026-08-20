import { useState, type FormEvent } from "react"
import type { Category } from "../types/interfaces"
import { createCategory, deleteCategory } from "../api/category"
import { toast } from "react-toastify"
interface CategoryManagerProps {
  categories: Category[]
  onChange: () => void
}
const CategoryManager = ({ categories, onChange }: CategoryManagerProps) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createCategory({ name, description })
      toast.success("Category created")
      setName("")
      setDescription("")
      onChange()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create category")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category? Products using it will be left pointing at a missing category.")) return
    try {
      await deleteCategory(id)
      toast.success("Category deleted")
      onChange()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete category")
    }
  }
  return (
    <div className="category-manager">
      <form className="category-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input required value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Description
          <input required value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Category"}
        </button>
      </form>
      <ul className="category-list">
        {categories.map(cat => (
          <li key={cat._id}>
            <span>{cat.name} - {cat.description}</span>
            <button onClick={() => handleDelete(cat._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryManager