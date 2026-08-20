import api from "./cilent"
import type { CategoryResponse, CategorySingleResponse } from "../types/interfaces"

export const getAllCategories = async (): Promise<CategoryResponse> => {
    const response = await api.get("/category/getAll")
    return response.data
}

export const createCategory = async (data: { name: string; description: string }): Promise<CategorySingleResponse> => {
    const response = await api.post("/category/create", data)
    return response.data
}

export const updateCategory = async (id: string, data: { name: string; description: string }): Promise<CategorySingleResponse> => {
    const response = await api.put(`/category/${id}`, data)
    return response.data
}

export const deleteCategory = async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/category/${id}`)
    return response.data
}