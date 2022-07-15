type ProductDescription = {
  [index: string]: string;
};

export type Category = 'Laptop' | 'Monoblock' | 'Smartphone' | 'Tablet' | 'TV';
export type Brand =
  | 'Asus'
  | 'Lenovo'
  | 'IRBIS'
  | 'Haier'
  | 'Acer'
  | 'Echips'
  | 'Poco'
  | 'realme'
  | 'ZTE'
  | 'Xiaomi'
  | 'Vivo'
  | 'Samsung'
  | 'Horizont'
  | 'KIVI'
  | 'HP'
  | 'MSI'
  | 'Dell'
  | 'Huawei'
  | 'Realme'
  | 'KIWI';

export interface Product {
  id: number;
  brand: Brand;
  category: Category;
  title: string;
  description: ProductDescription;
  price: number;
  isPopular: boolean;
  year: number;
  currency: string;
  img: string;
  count: number;
}

export interface Filters {
  category: Category[];
  brand: Brand[];
  [key: string]: Category[] | Brand[];
}

export interface AppState {
  products: Array<Product>;
  visible: Array<Product>;
  cart: Array<Product>;
  isOnCart: boolean;
  sortSettings: string;
  defaultFilters: Filters;
  filters: Filters;
}
