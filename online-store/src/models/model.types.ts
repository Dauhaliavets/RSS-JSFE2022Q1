type ProductDescription = {
  [index: string]: string;
};

export type Category = 'Laptop' | 'Monoblock' | 'Printer' | 'SmartWatch' | 'Smartphone' | 'Tablet' | 'TV';

export interface Product {
  id: number;
  brand: string;
  category: Category;
  title: string;
  description: ProductDescription;
  price: number;
  discount: number;
  currency: string;
  img: string;
  count: number;
}

export interface DefaultFilters {
  category: Category[];
}

export interface AppState {
  products: Array<Product>;
  visible: Array<Product>;
  cart: Array<Product>;
  isOnCart: boolean;
  sortSettings: string;
  defaultFilters: DefaultFilters;
  filters: {
    category: Category[];
    [key: string]: Category[];
  };
}
