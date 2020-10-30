export interface Category {
  style?: string;
  artist?: string;
  alignment?: string;
}

export interface Product {
  name?: string;
  price?: number;
  category?: Category;
}
