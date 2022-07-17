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

export type IsPopular = true | false;

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
  [key: string]: number | string | boolean | ProductDescription;
}

export interface Filters {
  isPopul: string[];
  category: Category[];
  brand: Brand[];
  [key: string]: Category[] | Brand[] | string[];
}

export interface Ranges {
  count: number[];
  year: number[];
  [key: string]: number[];
}

export interface AppState {
  products: Product[];
  visible: Product[];
  cart: Product[];
  isOnCart: boolean;
  sortSettings: string;
  searchValue: string;
  defaultFilters: Filters;
  filters: Filters;
  ranges: Ranges;
}
