
import type { Product } from "../../types/interfaces"
 
interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}
 
const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  if (products.length === 0) {
    return <p>No products yet.</p>
  }
  return (
    <table className="admin-product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>₹{product.price}</td>
            <td>{product.stock}</td>
            <td>
              <button onClick={() => onEdit(product)}>Edit</button>
              <button onClick={() => onDelete(product._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
 
export default ProductTable