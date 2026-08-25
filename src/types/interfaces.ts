import type { ReactNode } from "react";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
export interface ProductResponse {
  message:string;
  products:Product[]
}
export interface ProductCardProps {
  product:Product
}
export interface cartType {
  product : Product;
  quantity:number;
}
export interface cartContextType {
  cartItems:cartType[];
  addToCart:(item:cartType) => void;
  removeFromCart:(productId:string) =>void;
  increaseQuantity:(productId:string) =>void,
  decreaseQuantity:(productId:string) =>void,
  clearCart : () => void;
}
export interface CartContextProps  {
  children: ReactNode
}
export interface userDetails {
  email:string;
  password:string;
  role?: "admin" | "user";
}
export interface LoginInput {
  email: string;
  password: string;
}
export interface RegisterUserDetails {
  username:string;
  email:string;
  password:string;
  role:string;

}
export interface authProviderType {
    user: userDetails | null;
    loading: boolean;
    login: (data: userDetails) => Promise<void>
    logout: () => Promise<void>;
    fetchCurrUser: () => Promise<void>
}
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role?: string;
}
export interface Category {
  _id: string;
  name: string;
  description: string;
}
export interface CategoryResponse {
  message: string;
  categories: Category[];
}
export interface CategorySingleResponse {
  message: string;
  category: Category;
}
export interface ProductSingleResponse {
  message: string;
  product: Product;
}
export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
}
export interface ProductFormProps {
  categories: Category[]
  editingProduct: Product | null
  onDone: () => void
  onCancel: () => void
}
export interface ProductQueryParams {
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    sort?: "price_asc" | "price_desc"
    page?: number
    limit?: number
}
export interface OrderItemInput {
  product: string;
  quantity: number;
}
export interface OrderResponse {
  message: string;
  order: {
    _id: string;
    user: string;
    items: { product: string; quantity: number; price: number }[];
    totalAmount: number;
    status: string;
    paymentStatus: string;
  };
}