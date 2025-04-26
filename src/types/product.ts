
export type ProductCategory = 'cakes' | 'cookies' | 'breads' | 'pastries';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  featured?: boolean;
  new?: boolean;
  bestseller?: boolean;
}
