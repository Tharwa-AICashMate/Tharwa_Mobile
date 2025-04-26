import { Category, CreateCategoryDTO } from "@/types/category";

const API_BASE_URL = 'http://192.168.1.4:3000';
// const API_BASE_URL = 'http://localhost:5000';



export const fetchCategories = async (userId?: string): Promise<Category[]> => {
  const url = userId 
    ? `${API_BASE_URL}/categories?user_id=${userId}`
    : `${API_BASE_URL}/categories`;
  
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch categories');
  }
  return response.json();
};

export const createCategory = async (
  categoryData: CreateCategoryDTO
): Promise<Category> => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create category');
  }
  return response.json();
};

export const deleteCategory = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete category');
  }
};