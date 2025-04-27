import { Category, CreateCategoryDTO } from "@/types/category";
import { apiBase } from "@/utils/axiosInstance";


export const fetchCategories = async (userId?: string): Promise<Category[]> => {
  const url = userId
    ? `${apiBase}/categories?user_id=${userId}`
    : `${apiBase}/categories`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch categories");
  }
  return response.json();
};

export const createCategory = async (
  categoryData: CreateCategoryDTO
): Promise<Category> => {
  const response = await fetch(`${apiBase}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create category");
  }
  return response.json();
};

export const deleteCategory = async (id: number): Promise<void> => {
  console.log(id);
  const response = await fetch(`${apiBase}/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete category");
  }
};
