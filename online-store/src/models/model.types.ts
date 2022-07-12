type ProductDescription = {
  [index: string]: string;
}

export interface Product {
    id: number,
    brand: string,
    category: string,
    title: string,
    description: ProductDescription,
    price: number,
    img: string,
    count: number,
}

export interface AppState {
  products: Product[],
  cart: Product[],
  isOnCart: boolean,
} 