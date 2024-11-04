export interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  categoryId: string,
  images: string[];
}

export type ProductQueryParams = {
  limit: number
  offset: number
  title?: string
}

export type Inputs = Omit<Product, "id" | "images">

export interface Category {
  id: number,
  name: string
}

export const trunc = (text: string | undefined, maxLength: number): string =>
  text && text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text || '';