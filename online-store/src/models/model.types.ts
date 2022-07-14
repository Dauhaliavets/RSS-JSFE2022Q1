type ProductDescription = {
  [index: string]: string;
};

export enum Category {
  Laptop = 'Laptop',
  Monoblock = 'Monoblock',
  Printer = 'Printer',
  Smartphone = 'Smartphone',
  Tv = 'TV',
}

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
}
