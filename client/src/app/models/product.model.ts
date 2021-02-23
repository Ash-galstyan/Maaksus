export interface Category {
  style?: string;
  artist?: string;
  alignment?: string;
}

export interface Carousel {
  id?: string;
  productName?: string;
  productDescription?: string;
  articleNumber?: string;
  artist?: string;
  style?: string;
  availability?: string;
  price?: number;
  width?: number;
  height?: number;
  img?: string;
  artistDescription?: string;
}

export interface Product {
  id?: string;
  productName?: string;
  articleNumber?: string;
  artist?: string;
  style?: string;
  availability?: string;
  price?: number;
  width?: number;
  height?: number;
  img?: string;
  detailImages?: any;
  artistDescription?: string;
  category?: Category;
}
