type ProductDescription = {
  [index: string]: string;
};

export type Category = 'Laptop' | 'Monoblock' | 'Printer' | 'Smartphone' | 'TV';

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
  isChoise: boolean;
  count: number;
}

export interface AppState {
  products: Array<Product>;
  visible: Array<Product>;
  cart: Array<Product>;
  isOnCart: boolean;
  sortSettings: string;
  filters: {
    category: string[];
  };
}
