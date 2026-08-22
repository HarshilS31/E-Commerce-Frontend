import api from "./cilent"
import  type { ProductResponse, ProductSingleResponse, ProductFormValues,ProductQueryParams } from "../types/interfaces"

export const getProducts  = async () :Promise<ProductResponse> => {
    const response = await api.get("/product/getAll")
    return response.data
}
export const getProductById = async (id:string) : Promise<ProductResponse> => {
     const response =await  api.get(`product/${id}`)
     return response.data  
} 
export const createProduct = async (formData: FormData): Promise<ProductSingleResponse> => {
    const response = await api.post("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data
}
export const updateProduct = async (id: string, data: ProductFormValues): Promise<ProductSingleResponse> => {
    const response = await api.put(`/product/${id}`, data)
    return response.data
}
 
export const deleteProduct = async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/product/${id}`)
    return response.data
}
export const filterProducts = async (params:ProductQueryParams) => {
    const response = await api.get('/product/products',{params})
    return response.data
}